if("serviceWorker" in navigator){
  navigator.serviceWorker.register("sw.js").then(
      registration => {
          console.log("SW registered");
          console.log(registration);
      }
  ).catch(error => {
      console.log("SW failed");
  })
}

function fireIt() {
    Notification.requestPermission().then(function(result) {
        if (result === 'granted') {
          navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification('Notification 1', {body:"Here is body"});
          });
        }
      });
}

setInterval(function(){
    Notification.requestPermission().then(function(result) {
        if (result === 'granted') {
          navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification('Notification delayed', {body:"Time to add task"});
          });
        }
      });
}, 5000);


/*
document.querySelector('#notification-button').onclick = async () => {
    const reg = await navigator.serviceWorker.getRegistration();
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') {
        alert('you need to allow push notifications');
      } else {
        const timestamp = new Date().getTime() + 5 * 1000; // now plus 5000ms
        reg.showNotification(
          'Demo Push Notification',
          {
            tag: timestamp, // a unique ID
            body: 'Hello World', // content of the push notification
            showTrigger: new TimestampTrigger(timestamp), // set the time for the push notification
            data: {
              url: window.location.href, // pass the current url to the notification
            }
          }
        );
        reg.showNotification(
        'Demo Push Notification',
        {
          tag: timestamp, // a unique ID
          body: 'Hello World', // content of the push notification
          showTrigger: new TimestampTrigger(timestamp), // set the time for the push notification
          data: {
            url: window.location.href, // pass the current url to the notification
          },
          actions: [
            {
              action: 'open',
              title: 'Open app'
            },
            {
              action: 'close',
              title: 'Close notification',
            }
          ]
        }
      );
      }
    });
    
}

navigator.serviceWorker.addEventListener('message', event => console.log(event.data));

*/
