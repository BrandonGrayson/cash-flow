// cache variables
const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// files to cache
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '../routes/api.js',
    '/manifest.webmanifest',
    '/assets/images/icons/icon-192x192.png',
    '/assets/images/icons/icon-512x512.png',
];

  // install
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(DATA_CACHE_NAME).then((cache) => {
            console.log("Files were pre-cached successfully");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting()
});

// activate
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log("Removing old cache data", key);
                        return caches.delete(key)
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// fetch
self.addEventListener("fetch", function (event){
    const {url} = event.request
    if (url.includes("/api/transaction")) {
        event.respondWith(
            caches.open(DATA_CACHE_NAME).then(cache => {
                return fetch(event.request)
                .then(response => {
                    // if response was good clone it and store it in the cache
                    if (response.status === 200) {
                        cache.put(event.request, response.clone());
                    }
                    return response
                })
                .catch(err => {
                    // Network request failed, 
                    return cache.match(event.request);
                });

            }).catch(err => console.log(err))
        )
    } else {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return cache.match(event.request).then(response => {
                    return response || fetch(event.request);
                });
            })
        );
    }
});


