const CACHE_NAME = 'xotaro-v6';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://i.ibb.co/Y4xSMSb3/logo.png',
  'https://i.ibb.co/vx3Ddy6y/intro.jpg',
  'https://cdn.pixabay.com/download/audio/2022/02/07/audio_13a3627063.mp3?filename=soft-piano-10723.mp3'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => {
    return Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
  }));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
