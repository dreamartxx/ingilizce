// Audio sprites keep the download count low; every entry has a precise playback window.
export function narrationClip(entry){
 const clip=typeof entry==='string'?{src:entry,start:0,end:null}:entry;
 if(!clip||!/^\/audio\/[a-f0-9]+\.mp3$/.test(clip.src)||!Number.isFinite(clip.start)||clip.start<0||!(clip.end===null||Number.isFinite(clip.end)&&clip.end>clip.start))return null;
 return clip;
}
export function playNarration(audio,clip,{slow=false,onState=()=>{},onError=()=>{}}={},clock={setTimeout:(fn,ms)=>setTimeout(fn,ms),clearTimeout:id=>clearTimeout(id)}){
 let stopped=false,timer;const rate=slow?.75:1;
 const clear=()=>clock.clearTimeout(timer);
 function stop(){if(stopped)return;stopped=true;clear();audio.pause();audio.removeAttribute('src');audio.load();onState(false);}
 function fail(){if(stopped)return;stop();onError();}
 function check(){if(stopped)return;if(clip.end!==null&&audio.currentTime>=clip.end-.025){stop();return;}clear();if(!audio.paused&&clip.end!==null)timer=clock.setTimeout(check,Math.max(10,Math.min(80,(clip.end-audio.currentTime)/audio.playbackRate*1000)));}
 audio.onloadedmetadata=async()=>{if(stopped)return;if(clip.end!==null&&clip.end>audio.duration+.1){fail();return;}try{audio.playbackRate=rate;audio.currentTime=clip.start;await audio.play();if(stopped){audio.pause();return;}onState(true);check();}catch{fail();}};
 audio.ontimeupdate=check;audio.onplaying=check;audio.onended=stop;audio.onerror=fail;
 audio.onpause=()=>{clear();onState(false);};
 audio.defaultPlaybackRate=rate;audio.preload='auto';audio.src=clip.end===null?clip.src:`${clip.src}#t=${clip.start},${clip.end}`;audio.load();
 return stop;
}
