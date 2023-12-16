// Done
// eslint-disable-next-line import/no-unresolved, import/extensions
import CacheHelper from './utils/cache-helper';

const assetsToCache = [
  './',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  './index.html',
  './favicon.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener('sinstall', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
