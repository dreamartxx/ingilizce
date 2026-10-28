import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
import {randomUUID} from 'node:crypto';
import express from 'express';
import {MysqlStore,hashPassword} from './store.js';
import {createApp,apiErrors} from './app.js';
if(existsSync('.env'))process.loadEnvFile('.env');
const env=process.env;
let store=null;
if(env.DB_NAME&&env.DB_USER){store=new MysqlStore(env);try{await store.init();if(env.OWNER_EMAIL&&env.OWNER_PASSWORD){if(env.OWNER_PASSWORD.length<12)throw Error('OWNER_PASSWORD must contain at least 12 characters');const email=env.OWNER_EMAIL.trim().toLowerCase();if(!await store.userByEmail(email))await store.createUser({id:randomUUID(),email,name:env.OWNER_NAME||'Öğrenci',password_hash:await hashPassword(env.OWNER_PASSWORD)});}}catch(error){console.error('Database initialization failed. Check database credentials, permissions and owner password length.');await store.close();process.exit(1);}}
const app=createApp({store,env});
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dist=resolve(root,'dist');
if(existsSync(resolve(dist,'index.html'))){app.use(express.static(dist,{index:false}));app.get('/{*path}',(_req,res)=>res.sendFile(resolve(dist,'index.html')));}else if(env.NODE_ENV!=='production'){const {createServer}=await import('vite');const vite=await createServer({server:{middlewareMode:true},appType:'spa'});app.use(vite.middlewares);}else{app.get('/{*path}',(_req,res)=>res.status(503).send('Build missing. Run npm run build.'));}
app.use(apiErrors);
const port=Number(env.PORT||3000);
const server=app.listen(port,'0.0.0.0',()=>console.log(`Adım: http://localhost:${port}`));
server.on('error',()=>{console.error('Server could not start. Check PORT and network permissions.');process.exit(1);});
async function stop(){server.close();if(store)await store.close();process.exit(0);}
process.on('SIGTERM',stop);process.on('SIGINT',stop);
