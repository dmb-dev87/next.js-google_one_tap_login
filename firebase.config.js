// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBObku00LqH0umQK-5y0-iI8Lu_Q1swEvw",
  authDomain: "auth-9c57c.firebaseapp.com",
  projectId: "auth-9c57c",
  storageBucket: "auth-9c57c.appspot.com",
  messagingSenderId: "907296446695",
  appId: "1:907296446695:web:8359a9665435a9ec1faa42",
  measurementId: "G-FZXWED9C96"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const FirebaseAuth = getAuth(app);

export { FirebaseAuth };