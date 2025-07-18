const CACHE_NAME = 'sqlbit-cache-v2-' + (self.__BUILD_TIME__ || new Date().getTime());
const RUNTIME_CACHE = 'sqlbit-runtime';
const urlsToCache = [
  '/',
  '/app',
  '/about',
  '/img/192.png',
  '/img/512.png',
  '/img/sqlbit.png',
  '/offline.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle same-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // 1. Serve from cache
        return cachedResponse;
      }
      // 2. Fetch from network and cache it
      return fetch(event.request)
        .then((networkResponse) => {
          // Only cache valid responses
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        })
        // 3. If network fails, optionally serve a fallback (for HTML)
        .catch(() => {
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/offline.html');
          }
        });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean up old cache versions
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Claim clients so the new service worker takes effect immediately
      self.clients.claim()
    ])
  );
});