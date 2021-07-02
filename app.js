if ('serviceWorker' in navigator) {

  navigator.serviceWorker.register('./sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      // A wild service worker has appeared in reg.installing!
      newWorker = reg.installing;

      newWorker.addEventListener('statechange', () => {
        // Has network.state changed?
        switch (newWorker.state) {
          case 'installed':
            if (navigator.serviceWorker.controller) {
              // new update available
              showUpdateBar();
            }
            // No update available
            break;
        }
      });
    });
  });

  let refreshing;
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}

function showUpdateBar(){
  document.querySelector('.updateAvailable').classList.add('active');
}  
function fireUpdate() {
  document.querySelector('.updateAvailable').classList.remove('active');
  newWorker.postMessage({ action: 'skipWaiting' });
}
document.querySelector('.closebtnH').addEventListener('click', function(){
  document.querySelector('.updateAvailable').classList.remove('active');
});


let hours=10 , mins;

function timesetter() {
  const timerec = document.querySelector('.timesetter').value;
  hours = timerec.split(":")[0];
  mins = timerec.split(":")[1];
  console.log(hours + " -> "+mins);
}

function fireIt() {
    let thisTime = new Date();
    if(hours != undefined && mins !=undefined){
      let dateChanger = thisTime.getDate();
      for (let i = 0; i < 3; i++) {
        let temp = new Date(thisTime.getFullYear(), thisTime.getMonth(), dateChanger++, hours, mins, 0);
        console.log(temp);
        setNotification(temp);
      }
    }
    else
      alert("Set time and then try");
    showAll();
}

async function showAll(e){
  window.notifications = null;
  const registration = await navigator.serviceWorker.getRegistration();
  window.notifications = await registration.getNotifications({
    includeTriggered: true,
  });
  if (Array.isArray(window.notifications)) {
    window.notifications.forEach((notification, i) => {
      console.log(`notification title--> ${notification.title} \n notification time --> ${(new Date(notification.showTrigger.timestamp)).toLocaleTimeString()}`);
    }); 
  }
}

async function deleteAll(){
  window.notifications = null;
  const registration = await navigator.serviceWorker.getRegistration();
  window.notifications = await registration.getNotifications({
    includeTriggered: true,
  });
  if (Array.isArray(window.notifications)) {
    window.notifications.forEach((notification, i) => {
      notifications[i].close();
    }); 
  }
  showAll();
}



function setNotification(time) {
  Notification.requestPermission().then(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Notification from PWA', 
        {
          tag: Math.random().toString().substr(2),
          body:"-------Empty------\nThats all",
          showTrigger: new TimestampTrigger(time.getTime()),
        });
      });
    }
});
}


if ('showTrigger' in Notification.prototype) {
  console.log('Notification Triggers supported ');
}
else{
  console.log("Not supported");
}

/*
window.setInterval(function(){
  let dateIS = new Date();
  //console.log(dateIS.getHours()+" : "+dateIS.getMinutes()+" : "+dateIS.getSeconds());
  if(dateIS.getHours() == hours && dateIS.getMinutes() == mins && dateIS.getSeconds() == 1){
    
    Notification.requestPermission().then(function(result) {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification('Triggered by PWA', {
            body:"Clock met condition", 
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
          ]});
        });
      }
    });
  }
}, 1000);
*/
