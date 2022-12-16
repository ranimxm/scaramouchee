self.addEventListener("install", e => {
    console.log("install!");
});

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