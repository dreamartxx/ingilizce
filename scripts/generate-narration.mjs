import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {audioTexts} from '../src/academy/catalog.js';
const flag=n=>process.argv[process.argv.indexOf(n)+1];
const root=new URL('../public/audio/',import.meta.url);await mkdir(root,{recursive:true});
let manifest={provider:'ElevenLabs',clips:{}};try{manifest=JSON.parse(await readFile(new URL('manifest.json',root),'utf8'));}catch{}
const pending=audioTexts.filter(t=>!manifest.clips[t]);
console.log(JSON.stringify({total:audioTexts.length,ready:audioTexts.length-pending.length,pending:pending.length,characters:pending.reduce((s,t)=>s+t.length,0)}));
if(!process.argv.includes('--generate')||!pending.length)process.exit(0);
const keyFile=flag('--key-file');if(!process.argv.includes('--key-file')||!keyFile)throw Error('Use --key-file with a private local text file. Do not put the key in a command argument.');
const key=(await readFile(keyFile,'utf8')).trim();const voice=flag('--voice');if(!process.argv.includes('--voice')||!voice)throw Error('An existing ElevenLabs voice ID is required.');
const request=async(path,options={})=>{const r=await fetch('https://api.elevenlabs.io/v1/'+path,{...options,headers:{'xi-api-key':key,...options.headers},signal:AbortSignal.timeout(90000)});if(!r.ok)throw Error(`ElevenLabs returned HTTP ${r.status}; generation stopped, completed files are preserved.`);return r;};
// Check the account's available credits without printing identity or credentials.
const sub=await(await request('user/subscription')).json();const available=sub.character_limit-sub.character_count;
const max=process.argv.includes('--limit')?Number(flag('--limit')):pending.length;if(!Number.isInteger(max)||max<1)throw Error('Invalid --limit');
const batch=pending.slice(0,max),characters=batch.reduce((s,t)=>s+t.length,0);
console.log(JSON.stringify({availableCharacters:available,plannedCharacters:characters,clips:batch.length}));
if(!Number.isFinite(available)||characters>available)throw Error('Insufficient included credits; no upgrade or overage purchase will be attempted.');
for(const [i,text] of batch.entries()){
 const name=createHash('sha256').update(voice+'\n'+text).digest('hex').slice(0,24)+'.mp3';
 const r=await request('text-to-speech/'+encodeURIComponent(voice)+'?output_format=mp3_44100_128',{method:'POST',headers:{'Content-Type':'application/json',Accept:'audio/mpeg'},body:JSON.stringify({text,model_id:'eleven_multilingual_v2',voice_settings:{stability:0.55,similarity_boost:0.75}})});
 const bytes=Buffer.from(await r.arrayBuffer());if(!r.headers.get('content-type')?.includes('audio')||bytes.length<100)throw Error('Invalid audio response');
 await writeFile(new URL(name,root),bytes);manifest.clips[text]='/audio/'+name;
 await writeFile(new URL('manifest.tmp',root),JSON.stringify(manifest));await rename(new URL('manifest.tmp',root),new URL('manifest.json',root));
 console.log(`Saved ${i+1}/${batch.length}`);
}
