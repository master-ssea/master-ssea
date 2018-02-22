var CACHE = "bosch-cache-v2";

self.addEventListener("install", function(evt) {
  console.log("The service worker is being installed.");
  evt.waitUntil(precache());
});

self.addEventListener("fetch", function(evt) {
  console.log("The service worker is serving the asset.");
  evt.respondWith(
    fromNetwork(evt.request, 1000).catch(function() {
      return fromCache(evt.request).catch(function() {
        console.log("Trying to serve offline page.");
        return caches.match("offline.html");
      });
    })
  );
});

function precache() {
  return caches.open(CACHE).then(function(cache) {
    return cache.addAll([
      "index.html",
      "bundle.js",
      "styles.css",
      "offline.html",
      "assets/offline.png"
    ]);
  });
}

function fromNetwork(request, timeout) {
  return new Promise(function(fulfill, reject) {
    var timeoutId = setTimeout(reject, timeout);
    fetch(request).then(function(response) {
      clearTimeout(timeoutId);
      fulfill(response);
    }, reject);
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function(cache) {
    return cache.match(request).then(function(matching) {
      return matching || Promise.reject("no-match");
    });
  });
}
