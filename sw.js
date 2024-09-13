const CACHE_NAME = 'lista-de-compras-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/adicionarItem.js',
  '/js/verificarListaComprados.js',
  '/img/icons/icon-192x192.png',
  '/img/icons/icon-512x512.png'
];

// Instalando o Service Worker e armazenando arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptando requisições para servir arquivos do cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});