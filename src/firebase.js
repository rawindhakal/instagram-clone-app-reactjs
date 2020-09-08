import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA37bEabs-Fy3Wq4WiOQBFBh-DG6WDvGdA",
    authDomain: "instagram-clone-b8125.firebaseapp.com",
    databaseURL: "https://instagram-clone-b8125.firebaseio.com",
    projectId: "instagram-clone-b8125",
    storageBucket: "instagram-clone-b8125.appspot.com",
    messagingSenderId: "313002253236",
    appId: "1:313002253236:web:7e32434d9bf54f66a070e1",
    measurementId: "G-SDLPY7LED9"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};

// export default db;