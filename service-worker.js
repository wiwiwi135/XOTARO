const CACHE_NAME = 'xotaro-v1';
// قائمة الملفات اللي هتتحفظ عشان تشتغل أوفلاين
// ملاحظة: يفضل تحميل ملف الموسيقى mp3 ووضعه بجانب الملفات لضمان عمله أوفلاين
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './logo.png',
    './intro.png',
    // لو حملت الموسيقى عندك غير الرابط ده لـ ./music.mp3
    'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
];

// تنصيب الكاش
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// تفعيل الكاش وتنظيف القديم
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// جلب الملفات (أوفلاين فيرست)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // لو الملف موجود في الكاش رجعه، لو لأ هاته من النت
                return response || fetch(event.request);
            })
    );
});
