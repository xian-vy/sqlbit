const CACHE_NAME = 'sqlbit-cache-v1-' + (self.__BUILD_TIME__ || new Date().getTime());
const RUNTIME_CACHE = 'sqlbit-runtime';
const urlsToCache = [
  '/',
  '/app',
  '/about',
  '/img/192.png',
  '/img/512.png',
  '/img/sqlbit.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Always try network first for HTML requests
        if (event.request.headers.get('accept').includes('text/html')) {
          return fetch(event.request)
            .then((response) => {
              if (!response || response.status !== 200) {
                return cachedResponse;
              }
              const responseToCache = response.clone();
              caches.open(RUNTIME_CACHE)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              return response;
            })
            .catch(() => cachedResponse);
        }

        if (cachedResponse) {
          // Return cached response and update in background
          fetch(event.request)
            .then((response) => {
              if (response && response.status === 200) {
                const responseToCache = response.clone();
                caches.open(RUNTIME_CACHE)
                  .then((cache) => {
                    cache.put(event.request, responseToCache);
                  });
              }
            });
          return cachedResponse;
        }

        // If not in cache, fetch from network
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200) {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
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