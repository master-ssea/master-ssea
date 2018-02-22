importScripts("https://www.gstatic.com/firebasejs/4.9.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.9.0/firebase-messaging.js");

const config = {
  apiKey: "AIzaSyDN6i-0wR7M-B6KYmY3S8dJqy8d65Tp9qk",
  authDomain: "university-f3ce2.firebaseapp.com",
  databaseURL: "https://university-f3ce2.firebaseio.com",
  projectId: "university-f3ce2",
  storageBucket: "university-f3ce2.appspot.com",
  messagingSenderId: "289185582138"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(payload => {
  return self.registration.showNotification();
});
