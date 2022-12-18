self.addEventListener("install", e => {
    e.waitUntil(
            caches.open("statics").then(cache => {
                return cache.addAll([
                    "/index.html", 
                    "./src/style.css", 
                    "./image/sa.png", 
                    "./src/sounds.html"
                    
                ]);
            })
         );
    });

    self.addEventListener("fetch", e => {
    e.respondWith(
         caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
      );
});
//  self.addEventListener("fetch", e => {
//   })