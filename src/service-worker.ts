/// <reference lib="webworker" />

const CACHE_NAME = 'techtrove-cache-v1';
const OFFLINE_URL = '/offline.html';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/src/main.tsx',
  '/src/App.css',
];

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(STATIC_ASSETS);
    })()
  );
  (self as any).skipWaiting();
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      // Clean up old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
      await (self as any).clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    (async () => {
      try {
        // Try to get the response from the network
        const response = await fetch(event.request);
        
        // Cache successful GET requests
        if (event.request.method === 'GET') {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, response.clone());
        }
        
        return response;
      } catch (error) {
        // If network request fails, try to get it from cache
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // If it's a page navigation and there's no cached response, return offline page
        if (event.request.mode === 'navigate') {
          const offlineResponse = await caches.match(OFFLINE_URL);
          if (offlineResponse) {
            return offlineResponse;
          }
        }

        // If all else fails, throw the error
        throw error;
      }
    })()
  );
}); 