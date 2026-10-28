import mysql from 'mysql2/promise';
import {randomBytes,scrypt as scryptCb,timingSafeEqual,createHash} from 'node:crypto';
import {promisify} from 'node:util';
const scrypt=promisify(scryptCb);
export async function hashPassword(password){const salt=randomBytes(16).toString('hex');const key=await scrypt(password,salt,64);return `${salt}:${key.toString('hex')}`;}
export async function checkPassword(password,hash){if(!hash)return false;const [salt,expected]=hash.split(':');const key=await scrypt(password,salt,64);const bytes=Buffer.from(expected,'hex');return bytes.length===key.length&&timingSafeEqual(bytes,key);}
export const tokenHash=token=>createHash('sha256').update(token).digest('hex');
export class MysqlStore {
 constructor(env){this.pool=mysql.createPool({host:env.DB_HOST||'127.0.0.1',port:Number(env.DB_PORT||3306),user:env.DB_USER,password:env.DB_PASSWORD,database:env.DB_NAME,connectionLimit:5,charset:'utf8mb4',timezone:'Z'});}
 async init(){for(const sql of [
 'CREATE TABLE IF NOT EXISTS users (id VARCHAR(36) PRIMARY KEY, email VARCHAR(254) NOT NULL UNIQUE, name VARCHAR(80) NOT NULL, password_hash VARCHAR(200) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
 'CREATE TABLE IF NOT EXISTS sessions (token_hash CHAR(64) PRIMARY KEY, user_id VARCHAR(36) NOT NULL, expires BIGINT NOT NULL, INDEX (expires), FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)',
 'CREATE TABLE IF NOT EXISTS progress (user_id VARCHAR(36) PRIMARY KEY, state JSON NOT NULL, revision INT NOT NULL DEFAULT 0, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)',
 'CREATE TABLE IF NOT EXISTS ai_usage (user_id VARCHAR(36) NOT NULL, day CHAR(10) NOT NULL, requests INT NOT NULL DEFAULT 0, PRIMARY KEY(user_id,day), FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)'
 ])await this.pool.query(sql);}
 async userByEmail(email){const [rows]=await this.pool.execute('SELECT * FROM users WHERE email=?',[email]);return rows[0];}
 async createUser(user){await this.pool.execute('INSERT INTO users (id,email,name,password_hash) VALUES (?,?,?,?)',[user.id,user.email,user.name,user.password_hash]);}
 async session(token,userId,expires){await this.pool.execute('DELETE FROM sessions WHERE expires < ?',[Date.now()]);await this.pool.execute('INSERT INTO sessions VALUES (?,?,?)',[tokenHash(token),userId,expires]);}
 async userForToken(token){const [rows]=await this.pool.execute('SELECT users.* FROM users JOIN sessions ON users.id=sessions.user_id WHERE token_hash=? AND expires>?',[tokenHash(token),Date.now()]);return rows[0];}
 async logout(token){await this.pool.execute('DELETE FROM sessions WHERE token_hash=?',[tokenHash(token)]);}
 async changePassword(id,hash){const c=await this.pool.getConnection();try{await c.beginTransaction();await c.execute('UPDATE users SET password_hash=? WHERE id=?',[hash,id]);await c.execute('DELETE FROM sessions WHERE user_id=?',[id]);await c.commit();}catch(e){await c.rollback();throw e;}finally{c.release();}}
 async getProgress(id){const [rows]=await this.pool.execute('SELECT state,revision FROM progress WHERE user_id=?',[id]);if(!rows[0])return {state:null,revision:0};return {state:typeof rows[0].state==='string'?JSON.parse(rows[0].state):rows[0].state,revision:rows[0].revision};}
 async saveProgress(id,state,revision){await this.pool.execute('INSERT IGNORE INTO progress (user_id,state,revision) VALUES (?, ?, 0)',[id,'{}']);const [r]=await this.pool.execute('UPDATE progress SET state=?,revision=revision+1 WHERE user_id=? AND revision=?',[JSON.stringify(state),id,revision]);return r.affectedRows===1;}
 async useAi(id,day,limit){
  // Seed in autocommit: keeping INSERT IGNORE and UPDATE in one transaction
  // would upgrade shared row locks and can deadlock concurrent requests.
  await this.pool.execute('INSERT IGNORE INTO ai_usage (user_id,day,requests) VALUES (?,?,0)',[id,day]);
  const [r]=await this.pool.execute('UPDATE ai_usage SET requests=requests+1 WHERE user_id=? AND day=? AND requests<?',[id,day,limit]);
  return r.affectedRows===1;
 }
 async close(){await this.pool.end();}
}
// Only used by automated tests; production never silently falls back to memory.
export class MemoryStore {
 constructor(){this.users=[];this.sessions=new Map();this.progress=new Map();this.usage=new Map();}
 async userByEmail(email){return this.users.find(u=>u.email===email);}
 async createUser(user){if(await this.userByEmail(user.email))throw new Error('duplicate');this.users.push(user);}
 async session(token,userId,expires){this.sessions.set(tokenHash(token),{userId,expires});}
 async userForToken(token){const s=this.sessions.get(tokenHash(token));return s&&s.expires>Date.now()?this.users.find(u=>u.id===s.userId):null;}
 async logout(token){this.sessions.delete(tokenHash(token));}
 async changePassword(id,hash){this.users.find(u=>u.id===id).password_hash=hash;for(const [k,s] of this.sessions)if(s.userId===id)this.sessions.delete(k);}
 async getProgress(id){return this.progress.get(id)||{state:null,revision:0};}
 async saveProgress(id,state,revision){const old=await this.getProgress(id);if(old.revision!==revision)return false;this.progress.set(id,{state,revision:revision+1});return true;}
 async useAi(id,day,limit){const key=id+day,n=this.usage.get(key)||0;if(n>=limit)return false;this.usage.set(key,n+1);return true;}
}
