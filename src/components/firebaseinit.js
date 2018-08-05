import firebase from 'firebase'
import 'firebase/firestore'
var config = {
    apiKey: "AIzaSyBdTHivYXVwKGh4A0k2Vg0Z50stfdP9vEE",
    authDomain: "vokabulartrainer.firebaseapp.com",
    databaseURL: "https://vokabulartrainer.firebaseio.com",
    projectId: "vokabulartrainer",
    storageBucket: "vokabulartrainer.appspot.com",
    messagingSenderId: "668189070620"
  };
  firebase.initializeApp(config);
  const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);

export default firestore

