self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Para PWA básico, apenas proxy as requests
  event.respondWith(fetch(event.request));
});
