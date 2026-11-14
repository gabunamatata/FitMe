const CACHE='fitflow-v15';
const FILES=['./','index.html','styles.css?v=15','app.js?v=15','manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request,{cache:'no-cache'}).catch(async()=>{
   const cache=await caches.open(CACHE);
   return (await cache.match('index.html'))||Response.error();
  }));
  return;
 }
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
