self.addEventListener("install", e => {
  e.waitUntil(
      caches.open("NotifyTrial").then(cache => {
          return cache.addAll(["./", "./app.js", "./style.css", "./Logo.png"]);
      })
  );
});


self.addEventListener("fetch", e => {
  console.log(`Intesepting fet req for: ${e.request.url}`);

  e.respondWith(
      caches.match(e.request).then(response => {
          return response || fetch(e.request);
      })
  );

  e.waitUntil(update(e.request))

});

var CACHE = 'cache-update-and-refresh';

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response.clone()).then(function () {
        return response;
      });
    });
  });
}



setInterval(function(){
  let dateIS = new Date();
  if(dateIS.getHours() == 14 && dateIS.getMinutes() == 3 && dateIS.getSeconds() == 1){
    self.registration.showNotification('Hello, World.');
    return 'done'
  }
}, 1000)

self.addEventListener('notificationclick', event => {
  if (event.action === 'open') {
    event.waitUntil(self.clients.openWindow('./'));
  }
});

self.addEventListener('notificationclick', event => {
  if (event.action === 'close') {
    event.notification.close();
  } else {
    self.clients.openWindow('/');
  }
});


//self.addEventListener('install', event => console.log('ServiceWorker installed'));



/*


self.addEventListener('notificationclick', event => {
    event.waitUntil(self.clients.matchAll().then(clients => {
      if (clients.length){ // check if at least one tab is already open
        clients[0].focus();
      } else {
        self.clients.openWindow('/');
      }
    }));
});

self.addEventListener('notificationclick', event => {
    if (event.action === 'close') {
      event.notification.close();
    } else {
      self.clients.openWindow('/');
    }
});

self.addEventListener('notificationclick', event => {
    event.waitUntil(self.clients.matchAll().then(clients => {
      if(clients.length){ // check if at least one tab is already open
        clients[0].focus();
        clients[0].postMessage('Push notification clicked!');
      } else {
        self.clients.openWindow('/');
      }
    }));
  });

*/
