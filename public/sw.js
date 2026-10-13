const CACHE = "lion-fitness-v4";
const PUBLIC_PAGES = new Set(["/", "/sedes", "/actividades", "/horarios", "/planes", "/equipamiento", "/comunidad", "/nosotros"]);
const PUBLIC_ASSETS = new Set(["/offline.html", "/brand/lion-mark.svg", "/icon.svg", "/icon-maskable.svg"]);

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll([...PUBLIC_ASSETS])).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("lion-fitness-") && key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || request.headers.has("RSC") || request.headers.has("Next-Router-Prefetch")) return;
  const isDocument = request.mode === "navigate" && PUBLIC_PAGES.has(url.pathname) && !url.search;
  const isAsset = PUBLIC_ASSETS.has(url.pathname) && !url.search;
  if (!isDocument && !isAsset) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(request);
      const type = response.headers.get("content-type") || "";
      const cacheControl = response.headers.get("cache-control") || "";
      if (response.ok && !response.redirected && !/private|no-store/i.test(cacheControl) && (!isDocument || type.includes("text/html"))) {
        event.waitUntil(cache.put(request, response.clone()).catch(() => undefined));
      }
      return response;
    } catch {
      const cached = await cache.match(request);
      if (cached) return cached;
      if (isDocument) return (await cache.match("/offline.html")) || Response.error();
      return Response.error();
    }
  })());
});
