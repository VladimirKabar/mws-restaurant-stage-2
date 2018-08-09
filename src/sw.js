const staticCacheName = 'restaurant-cache-v3';
const filesToCache = [

    '/',
    './manifest.json',
    './index.html',
    './restaurant.min.html',
    './css/styles.min.css',
    './js/idb.min.js',
    './js/dbhelper.min.js',
    './js/main.min.js',
    './js/restaurant_info.min.js',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './img/large/1.jpg',
    './img/large/2.jpg',
    './img/large/3.jpg',
    './img/large/4.jpg',
    './img/large/5.jpg',
    './img/large/6.jpg',
    './img/large/7.jpg',
    './img/large/8.jpg',
    './img/large/9.jpg',
    './img/large/10.jpg'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(caches.open(staticCacheName).then(function (cache) {
        console.log('Cache is opened');
        return cache.addAll(filesToCache);
    })
    );
});

self.addEventListener('active', function (e) {
    e.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('restaurant-') && cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                  })
            );
        }))
});


self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request, { ignoreSearch: true }).then(function (res) { //now works with query string in the URL.  !!!!
            return res || fetch(e.request);
        }).catch(err => console.log(err, e.request))
    );
});


self.addEventListener('message', function (e) {
    if (e.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

