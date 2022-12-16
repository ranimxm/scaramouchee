self.addEventListener("install", e => {
    console.log("install");
});
// e.waitUntil(
//     caches.open("statics").then(cache => {
//         return cache.addAll(["./", "./src/style.css", "./image/logo192.png"]);
//     })
// );
//  self.addEventListener("fetch", e => {
//     e.respondWith(
//         caches.match(e.request).then(response => {
//            return response || fetch(e.request);
//        })
//      );
// });
//  self.addEventListener("fetch", e => {
//     console.log(`Intercepting fetch request for: ${e.request.url}`);
//  })