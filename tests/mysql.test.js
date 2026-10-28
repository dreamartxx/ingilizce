import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID,randomBytes} from 'node:crypto';
import {MysqlStore,hashPassword,checkPassword} from '../server/store.js';
import {freshProgress} from '../src/learning.js';
test('MySQL persists isolated records, sessions and atomic quotas across connections',{skip:process.env.MYSQL_TEST!=='1'},async()=>{
 assert.equal(process.env.DB_NAME,'adim_test','Integration test must use the isolated adim_test database');
 const store=new MysqlStore(process.env);const second=new MysqlStore(process.env);const ids=[randomUUID(),randomUUID()];
 try{
 await store.init();
 for(const id of ids)await store.createUser({id,email:id+'@example.test',name:'Test',password_hash:await hashPassword('test-password-123')});
 const state={...freshProgress(),completed:['hello']};
 assert.equal(await store.saveProgress(ids[0],state,0),true);
 assert.deepEqual((await second.getProgress(ids[0])).state.completed,['hello']);
 assert.equal((await second.getProgress(ids[1])).state,null);
 assert.equal(await second.saveProgress(ids[0],state,0),false);
 const token=randomBytes(32).toString('hex');await store.session(token,ids[0],Date.now()+60000);
 assert.equal((await second.userForToken(token)).id,ids[0]);
 const attempts=await Promise.all(Array.from({length:10},()=>store.useAi(ids[0],'2026-10-28',3)));
 assert.equal(attempts.filter(Boolean).length,3);
 await store.changePassword(ids[0],await hashPassword('changed-password-456'));
 assert.equal(await second.userForToken(token),undefined);
 assert.equal(await checkPassword('changed-password-456',(await second.userByEmail(ids[0]+'@example.test')).password_hash),true);
 }finally{await store.pool.execute('DELETE FROM users WHERE id IN (?,?)',ids);await store.close();await second.close();}
});
