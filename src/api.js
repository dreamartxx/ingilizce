import {validProgress} from './state.js';
export async function api(path,options={}){const r=await fetch('/api'+path,{credentials:'same-origin',...options,headers:{'Content-Type':'application/json',...options.headers},body:options.body?JSON.stringify(options.body):undefined});const data=await r.json();if(!r.ok){const error=new Error(data.error||'İşlem tamamlanamadı.');error.status=r.status;throw error;}return data;}
export function readDemo(){try{const saved=JSON.parse(localStorage.getItem('adim-demo-v1'));return validProgress(saved)?saved:null;}catch{return null;}}
