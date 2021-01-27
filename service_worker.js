// キャッシュファイルの指定
var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
    
    '/getHiScore.php',
    '/setHiScore.php',
    '/js/vue.js',
    '/js/vuemain.js',
    '/js/jquery-3.5.1.min.js',
    '/js/lodash.js',
    '/js/mixin_opening.js',
    '/js/mixin_closing.js',
    '/js/jquery.fancybox.min.js',
    '/js/jquery.fancybox.min.css',
    'icon.png',
    '/images/bk0.png'
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});
