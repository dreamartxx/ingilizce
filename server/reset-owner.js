import {existsSync} from 'node:fs';
import {MysqlStore,hashPassword} from './store.js';
if(existsSync('.env'))process.loadEnvFile('.env');
const env=process.env;
if(!env.OWNER_EMAIL||!env.OWNER_PASSWORD||env.OWNER_PASSWORD.length<12||!env.DB_NAME||!env.DB_USER){console.error('Set database credentials, OWNER_EMAIL and a new OWNER_PASSWORD of at least 12 characters in the environment.');process.exit(1);}
const store=new MysqlStore(env);
try{const user=await store.userByEmail(env.OWNER_EMAIL.trim().toLowerCase());if(!user)throw Error('Owner not found');await store.changePassword(user.id,await hashPassword(env.OWNER_PASSWORD));console.log('Owner password updated; all existing sessions revoked. Remove OWNER_PASSWORD from the environment after use.');}catch{console.error('Reset failed. Check account and database configuration.');process.exitCode=1;}finally{await store.close();}
