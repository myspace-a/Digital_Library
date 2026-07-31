// Offline caching for La Mia Biblioteca (Step 14).
// Strategy:
//  - App shell (HTML/CSS/JS/manifest/icon) is cached on install and served
//    "cache first" so the app opens instantly and works offline.
//  - Page navigations try the network first (to get the latest version when
//    online) and fall back to the cached index.html when offline.
//  - Everything else (e.g. book cover images, the XLSX library from the CDN)
//    is fetched from the network and saved into a runtime cache as it's
//    used, so it's available offline next time if it was seen before.
//
// Bump CACHE_NAME (e.g. to 'v2') whenever app shell files change, so
// returning users automatically get the new version instead of a stale cache.

const CACHE_NAME = 'biblioteca-v1';
const RUNTIME_CACHE = 'biblioteca-runtime-v1';

const CORE_ASSETS = [
  './',
  'index.html',
  'style.css',
  'app.js',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET requests — POST/etc. always go straight to the network.
  if (request.method !== 'GET') return;

  // Page navigations: network first, cache fallback (so offline still opens the app).
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  // Everything else: cache first, then network (and save the response for next time).
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        // Only cache successful, same-origin-or-CDN responses.
        if (!response || response.status !== 200) return response;

        const responseClone = response.clone();
        caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, responseClone));
        return response;
      }).catch(() => {
        // No cache and no network — let the request fail naturally
        // (e.g. a missing cover image just won't load).
        return undefined;
      });
    })
  );
});