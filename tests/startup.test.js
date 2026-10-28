import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';

test('hosting require loader starts the production server and serves its API', {timeout:15000}, async t=>{
  const child=spawn(process.execPath,['-e',"require('./server/index.js')"],{
    cwd:fileURLToPath(new URL('..',import.meta.url)),
    env:{...process.env,NODE_ENV:'production',PORT:'0',DB_NAME:'',DB_USER:'',AI_API_KEY:''},
    stdio:['ignore','pipe','pipe']
  });
  t.after(()=>{child.kill('SIGTERM');});
  const port=await new Promise((resolve,reject)=>{
    let output='';
    child.stderr.on('data',data=>{output+=data;});
    child.stdout.on('data',data=>{
      output+=data;
      const match=output.match(/Adım: http:\/\/localhost:(\d+)/);
      if(match)resolve(Number(match[1]));
    });
    child.once('error',reject);
    child.once('exit',code=>reject(new Error(`Startup exited ${code}: ${output}`)));
  });
  const response=await fetch(`http://127.0.0.1:${port}/api/config`);
  assert.equal(response.status,200);
  assert.equal(response.headers.get('content-type').includes('application/json'),true);
});
