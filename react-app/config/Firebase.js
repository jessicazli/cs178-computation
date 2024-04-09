// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhYlzawTuTZjU8LX5zWZFx2P8CFdrtJNs",
  authDomain: "recipe-generator-cs178.firebaseapp.com",
  projectId: "recipe-generator-cs178",
  storageBucket: "recipe-generator-cs178.appspot.com",
  messagingSenderId: "980313247503",
  appId: "1:980313247503:web:00087e384543e26fdeb87a",
  measurementId: "G-PYG94JNJ7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const analytics = getAnalytics(app);