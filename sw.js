 self.addEventListener("install", e => {
   e.waitUntil(
     caches.open("statics").then(cache => {
         return cache.addAll([              
             "./", 
              "./src/style.css", 
              "./image/sa.png"
          ])
         })
       )
     }); 


const addResourcesToCache = async (resources) => {
  const cache = await caches.open("statics");
  await cache.addAll(resources);
};

self.addEventListener("install", e => {
    e.waitUntil(
      addResourcesToCache([
                "./", 
               "./src/style.css", 
               "./image/sa.png",
           ])
          );
       }); 
// caches.open("statics").then(cache => {
//   return cache.addAll([


 self.addEventListener("fetch", e => {
         console.log(`Intercepting fetch request for: ${e.request.url}`);
  });
    //  self.addEventListener("fetch", e => {
    //    e.respondWith(
    //        caches.match(e.request).then(response => {
    //           return response || fetch(e.request);
    //        })
    //      );
    //   });