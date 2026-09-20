const CACHE = "lion-fitness-v2";
const OFFLINE = ["/", "/sedes", "/actividades", "/planes", "/equipamiento", "/images/instagram/gym-wilde.jpg", "/images/instagram/box-gap.jpg", "/images/instagram/equipment-machine.jpg", "/brand/lion-mark.jpg", "/icon.svg"];
self.addEventListener("install", (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(OFFLINE))));
self.addEventListener("activate", (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))));
self.addEventListener("fetch", (event) => { if (event.request.method !== "GET") return; event.respondWith(fetch(event.request).then((response) => { const copy = response.clone(); caches.open(CACHE).then((cache) => cache.put(event.request, copy)); return response; }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("/")))); });
