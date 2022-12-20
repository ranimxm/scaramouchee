
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("statics").then(cache => {
        return cache.addAll([              
            "./", 
             "./src/style.css", 
             "./image/sa.png",
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


//  self.addEventListener("fetch", e => {
//          console.log(`Intercepting fetch request for: ${e.request.url}`);
//   });
     self.addEventListener("fetch", e => {
       e.respondWith(
           caches.match(e.request).then(response => {
              return response || fetch(e.request);
           })
         );
      });

  //     function fetchHospitals() {
  //       axios
  //           .get('http://localhost:4000/hospitals')
  //           .then((response) => {
  //               const dbOpenRequest = indexedDB.open('hospitalDB', 1);
  //               dbOpenRequest.onupgradeneeded = function (event) {
  //                   const db = event.target.result;
  //                   db.createObjectStore('hospitalStore', { keyPath: 'id' });
  //               };
  //               dbOpenRequest.onsuccess = function (event) {
  //                   const db = event.target.result;
  //                   const txn = db.transaction('hospitalStore', 'readwrite');
  //                   const store = txn.objectStore('hospitalStore');
  //                   const clearRequest = store.clear();
  //                   clearRequest.onsuccess = function () {
  //                       response.data.forEach((hospital) => {
  //                           store.add(hospital);
  //                       });
  //                   };
  //               };
  //               setHospitals(response.data);
  //           })
  //           .catch(() => {
  //               const dbOpenRequest = indexedDB.open('hospitalDB', 1);
  //               dbOpenRequest.onsuccess = function (event) {
  //                   const db = event.target.result;
  //                   const txn = db.transaction('hospitalStore', 'readonly');
  //                   const store = txn.objectStore('hospitalStore');
  //                   const getAllRequest = store.getAll();
  //                   getAllRequest.onsuccess = function () {
  //                       setHospitals(getAllRequest.result);
  //                   };
  //               };
  //           });
  //   }

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     axios
  //         .post(`http://localhost:4000/hospital/${activeId}`, hospitalData)
  //         .then(() => {
  //             setActiveId(null);
  //             fetchHospitals();
  //         })
  //         .catch(() => {
  //             // store the form data in indexedDB
  //             // trigger a sync task
  //             navigator.serviceWorker.ready(serviceWorkerRegistration => {
  //                serviceWorkerRegistration.sync.register('some-unique-tag');
  //             });
  //         });
  // }
  // self.addEventListener('sync', event => {
  //   if (event.tag === 'unique-tag-name') {
  //     // retrieve data from indexedDB
  //     // make the api call with the data
  //   }
  // });
  
