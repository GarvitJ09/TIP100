// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvdNS47gIQTHdQgTzX7e-Kd7ofFFhW72o",
  authDomain: "tip100-f1628.firebaseapp.com",
  projectId: "tip100-f1628",
  storageBucket: "tip100-f1628.appspot.com",
  messagingSenderId: "603474913748",
  appId: "1:603474913748:web:485b00f85510ba5adfce41",
  measurementId: "G-ZFKDGMDY2C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseConfig.storageBucket);
export default storage;
