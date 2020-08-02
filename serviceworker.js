console.log('SW: Service Worker loaded.');

// Caching

const cacheName = 'cache-v1';
const preCacheList = [
    '/',
    'index.html',
    'app.css'
];


self.addEventListener('install', event => {
    console.log('SW: Install event fired!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(preCacheList)
            })
    );
});

self.addEventListener('activate', event => {
    console.log('SW: Activate event fired!');
});

self.addEventListener('fetch', event => {
    console.log('SW: Fetch event fired for: ', event.request.url);
    event.respondWith(caches.match(event.request)
        .then(cacheResponse => {
            return cacheResponse || fetch(event.request);
        })
    );
});


