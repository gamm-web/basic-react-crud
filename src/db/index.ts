// import firebase
import firebase from "firebase";

// config value from add firebase sdk script that showed earlier.
const config = {
    apiKey: "AIzaSyAY8Dv77i-EYfaaejAH5htPvL9F1poUnek",
    authDomain: "gamm-testings.firebaseapp.com",
    projectId: "gamm-testings",
    storageBucket: "gamm-testings.appspot.com",
    messagingSenderId: "123624216275",
    appId: "1:123624216275:web:0019fe23b8377f9eb2a626",
    measurementId: "YOUR_MEASUREMENT_ID",
};

// init app
firebase.initializeApp(config);

// export default firestore
export default firebase.firestore();