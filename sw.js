// Offline cache: the whole app works without internet after the first open.
const CACHE='wuertbuerg-v19';
const FILES=["./", "index.html", "manifest.json", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "pics/01_family.jpg", "pics/02_market.jpg", "pics/03_train.jpg", "pics/04_doctor.jpg", "pics/05_beach.jpg", "pics/06_park.jpg", "pics/07_classroom.jpg", "pics/08_cooking.jpg", "pics/09_city.jpg", "pics/10_mountain.jpg", "pics/11_office.jpg", "pics/12_children.jpg", "pics/13_supermarket.jpg", "pics/14_playground.jpg", "pics/15_gym.jpg", "pics/16_airport.jpg", "pics/17_garden.jpg", "pics/18_museum.jpg", "pics/19_cafe.jpg", "pics/20_winter.jpg", "pics/21_bus.jpg", "pics/22_living.jpg", "pics/23_laundry.jpg", "pics/24_football.jpg", "pics/25_wedding.jpg", "pics/26_library.jpg", "pics/27_construction.jpg", "pics/28_hairdresser.jpg", "pics/29_restaurant.jpg", "pics/30_swimming.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  // the page itself: network first so updates arrive, cache when offline
  if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put('index.html',c));return r;}).catch(()=>caches.match('index.html')));return;}
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(r=>{
    const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match('index.html'))));
});
