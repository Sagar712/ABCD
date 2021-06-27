if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

document.querySelector('#notification-button').onclick = async () => {
    const reg = await navigator.serviceWorker.getRegistration();
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') {
        alert('you need to allow push notifications');
      } 
      else {
        const timestamp = new Date().getTime() + 5 * 1000; // now plus 5000ms
        
        reg.showNotification(
            'Demo Push Notification',
            {
              tag: timestamp, // a unique ID
              body: 'Hello World', // content of the push notification
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

