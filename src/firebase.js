import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBQnxaxn2EyjdaDqj8BuRz3e02bfAFWK6M',
  authDomain: 'eduplatform-ba55c.firebaseapp.com',
  projectId: 'eduplatform-ba55c',
  storageBucket: 'eduplatform-ba55c.appspot.com',
  messagingSenderId: '495460385782',
  appId: '1:495460385782:web:260dbdf0515012899dbdd7',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
