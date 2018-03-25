/**
 * Copyright 2016 Google Inc. All rights reserved.
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
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["404.html","daac7143393ed98a1cfe697abcdf3cb4"],["app/scripts/app-0b7ef60a6e.min.js","0b7ef60a6ed482d59ad184141921f3ab"],["app/scripts/vendor-31275e0ad3.min.js","31275e0ad31d4a1794e0689e9affd63a"],["app/styles/app-22074298c1.min.css","22074298c14aaaf1c8b21635cee42293"],["assets/icons/icon-128x128.png","5d71ddc191518a885c5a86b705f59d67"],["assets/icons/icon-144x144.png","5d71ddc191518a885c5a86b705f59d67"],["assets/icons/icon-152x152.png","5d71ddc191518a885c5a86b705f59d67"],["assets/icons/icon-192x192.png","5d71ddc191518a885c5a86b705f59d67"],["assets/icons/icon-384x384.png","5d71ddc191518a885c5a86b705f59d67"],["assets/icons/icon-512x512.png","5d71ddc191518a885c5a86b705f59d67"],["assets/icons/icon-72x72.png","ca85ebe8da48609b74b8ae75a3f76c29"],["assets/icons/icon-96x96.png","c5ad8187f6d8717359265c3dd020ec80"],["assets/images/400/1.jpg","428bfe3a339bbfa77646eae0140d57ec"],["assets/images/400/1.webp","68ae8d210cb00521f1a71459cdbba442"],["assets/images/400/10.jpg","9a95e31ce3cb78d93e43462c0121e040"],["assets/images/400/10.webp","33faf8e8f0700adfd7c415a1df6d5baf"],["assets/images/400/2.jpg","3cdbece6b16e10d6a03b020b5f07629b"],["assets/images/400/2.webp","e56fbfef5d03712b37f5f0bf282d341e"],["assets/images/400/3.jpg","1bb5700d370f1c096f19be65e16e6189"],["assets/images/400/3.webp","508c4fb96c9be0fe413eb26b13669243"],["assets/images/400/4.jpg","219f124dc942aa70ee0f6611d0c5f262"],["assets/images/400/4.webp","cd6dfc732f82c09e90ae4b5589734d72"],["assets/images/400/5.jpg","b5ab8c658c0512da10bbe0451bf60fb1"],["assets/images/400/5.webp","f5d7144cc9f030fc77fd8f60bb8cccef"],["assets/images/400/6.jpg","c1ca7d7af32a99eee82a752c90bfbe02"],["assets/images/400/6.webp","0ae2f6ce33e7f2b588a089e8d04012f2"],["assets/images/400/7.jpg","9b66fd73294b5b20cbf0525edc918eb6"],["assets/images/400/7.webp","15d3983914f9eea7a01887c3111e6d3d"],["assets/images/400/8.jpg","dccf3ae225bb2773a3d029372bea63dd"],["assets/images/400/8.webp","bb2e4d893106214631ce3828b09da053"],["assets/images/400/9.jpg","e576446bb27cce9e4a50a28312013079"],["assets/images/400/9.webp","425b10844d0f45770684d7b1d3f2bd68"],["assets/images/480/1.jpg","9440ec4d1d566c438b55faf8a6180ed6"],["assets/images/480/1.webp","5f3332e299d6c1642cc74ccff63e65e0"],["assets/images/480/10.jpg","391119593f63de8cdcbacb1a9bdaeaad"],["assets/images/480/10.webp","1956313389018a5a35ff867f5665cbe4"],["assets/images/480/2.jpg","fe630541e0a85f1af065c8635be32f09"],["assets/images/480/2.webp","e680a76d2e8ef422e866690b29b1d7bf"],["assets/images/480/3.jpg","4c0162d43279ed24a391709c1bfe4b72"],["assets/images/480/3.webp","3faeae15de8c5dc026ddf5bca5026746"],["assets/images/480/4.jpg","524aaaaea9f9027afb66e534e962c8fb"],["assets/images/480/4.webp","1861794d68705e40a40c07f820640ea3"],["assets/images/480/5.jpg","1cdade1ac6bb66701f3285aa45e4005d"],["assets/images/480/5.webp","f1e967e167c2258f4865c814efd38fad"],["assets/images/480/6.jpg","1d9285d5c72f016b4180b1c3d902507a"],["assets/images/480/6.webp","9dc436acae67d9741d3795d5814c7659"],["assets/images/480/7.jpg","c67e72ff3a28a7b44a750e70d9d349f7"],["assets/images/480/7.webp","b2132f477a9c633c0d4cabdc74d8c858"],["assets/images/480/8.jpg","443aa980bbe241471ed4c364dcf13273"],["assets/images/480/8.webp","c2eb2522fa730a16a7713e03a22e59a5"],["assets/images/480/9.jpg","627d9d57b68effcb5a2fe00cb29d88bc"],["assets/images/480/9.webp","9a9a0df29ad1e558173963625bb435c4"],["assets/images/640/1.jpg","4765bc688e0f5e0fc03a26efc169f9cb"],["assets/images/640/1.webp","d8f726420a77113bc558a76c09bab050"],["assets/images/640/10.jpg","d361b0f270ca263668d7053ec6aa9cac"],["assets/images/640/10.webp","952932beb71a510b089a69ce7f0db850"],["assets/images/640/2.jpg","6d6ce548fdb3a28d8bdae8606c7bb517"],["assets/images/640/2.webp","68ad031f95c7de3ac5d67bcb68217232"],["assets/images/640/3.jpg","f9c0520a5d4105050a6a6a60c52744ee"],["assets/images/640/3.webp","eb63ec5ffd562a06b59ec7559b6b254f"],["assets/images/640/4.jpg","6233d09b07ed44e07f7463d313399f11"],["assets/images/640/4.webp","3b0e0b13b05649fc73ec2de75f3716cd"],["assets/images/640/5.jpg","b3b203b802bec8f8507945f1cf434e19"],["assets/images/640/5.webp","0fdd0c4a08c10d91d033422e305e6a3c"],["assets/images/640/6.jpg","f25d995b057c5f7cea7100ae9fc6fc78"],["assets/images/640/6.webp","74b57593a19e55c37c1abd5208554fe9"],["assets/images/640/7.jpg","80789f8f616e59469527a460dbfdd8b2"],["assets/images/640/7.webp","7427d2b68126e149df81ac8a3a1056a1"],["assets/images/640/8.jpg","41266a686c68a38ef0a7fd9ae5f1cffd"],["assets/images/640/8.webp","dd2e18fb37d93cce33e2b546f7919067"],["assets/images/640/9.jpg","fc3e6dd7b05201303dbc0bed703b6952"],["assets/images/640/9.webp","67f5c462f0b5582f7fe8248300a22792"],["assets/images/800/1.jpg","5c70805661d07a8a480654a4a0272621"],["assets/images/800/1.webp","fd8759877013b4bcb9761875915ea1a7"],["assets/images/800/10.jpg","0524e9f42c387f7496a3c3558c69a688"],["assets/images/800/10.webp","370c8d7024189e4dfc66036e8aaece03"],["assets/images/800/2.jpg","280ddab2bed6d29b5a459057fa5cc097"],["assets/images/800/2.webp","ed15e50ec375a7edec16e5a783922abe"],["assets/images/800/3.jpg","626c3982cfe4afea3b0999b1b070e7af"],["assets/images/800/3.webp","c08ecea30ed4292d208ce48925caab84"],["assets/images/800/4.jpg","629b7af49c58d4a2393108332e347dbf"],["assets/images/800/4.webp","a6f90512d07c0d5e9caf7b147b8fd366"],["assets/images/800/5.jpg","d45352c97bd1504220924cfbee9fdcc0"],["assets/images/800/5.webp","cb46d73bbbcdf036623f9176f9dbcfe0"],["assets/images/800/6.jpg","ffff77e168b9d931da55b836d0da21fd"],["assets/images/800/6.webp","47d66590f489ef34861ab2814fb85492"],["assets/images/800/7.jpg","27083fb5d734ad3febd3158980d68145"],["assets/images/800/7.webp","d3ba8862c6e27a34d7dab11536cce244"],["assets/images/800/8.jpg","19d78a5af9d0986636b4b6355d793a7f"],["assets/images/800/8.webp","5e5f18b0749b9cd197223e54c9f46701"],["assets/images/800/9.jpg","ec2d5176a0ca85e31e26c19e9565a08c"],["assets/images/800/9.webp","b13289171b7dc4d8a5cad8f1bfca0c05"],["assets/images/placeholder/map-home.webp","b5067ed11b42ee307334362e0187ee87"],["assets/images/placeholder/map-marker.webp","c126195254c80c927bb7fb352e521e0e"],["data/restaurants.json","10015b61972d04c6ddc90b00a07e695f"],["favicon.png","c2d2e8555efc218d60b704b47a3d6a1d"],["index.html","982d3301ca89d7ff2eb42cbebf450c2c"],["manifest.json","303bd47c04d6bac79cceb9fc45190acf"],["restaurant.html","1f60a372aca587a4c63c7f9188a0d44e"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







