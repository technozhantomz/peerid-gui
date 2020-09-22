self.addEventListener('push', event => {
  const {title, body} = event.data.json();
  console.log('New notification', title, body);
  event.waitUntil(self.registration.showNotification(title, {body}));
});
