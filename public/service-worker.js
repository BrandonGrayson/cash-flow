// cache variables
const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// files to cache
const FILES_TO_CACHE = [
    '/',
    '/index.html',
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


