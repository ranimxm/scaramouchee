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

      const intro = `/**
 *
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Built: ${new Date()}
 */
`;

const rollup = require('rollup');
const hash = require('./plugins/hash').findHashes;
const babel = require('rollup-plugin-babel');
const entries = [
  "./", 
               "./src/style.css", 
               "./image/sa.png",
];

let cache;
entries.forEach(entry => {
  rollup.rollup({
    entry: `src/${entry}`,
    cache,
    plugins: [
      hash(),
      babel()
    ]
  }).then(bundle => {
    cache = bundle;
    bundle.write({
      intro,
      format: 'iife',
      dest: `dist/${entry}`
    });
  });
});