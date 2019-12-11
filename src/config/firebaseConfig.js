import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyC7iQM7QuCEQMjtj8zXbF0Td0Ke9tTiONc",
    authDomain: "final-77a42.firebaseapp.com",
    databaseURL: "https://final-77a42.firebaseio.com",
    projectId: "final-77a42",
    storageBucket: "final-77a42.appspot.com",
    messagingSenderId: "755627208992",
    appId: "1:755627208992:web:f63fab8f70afe220c06745",
    measurementId: "G-YCMNGCN2P4"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;