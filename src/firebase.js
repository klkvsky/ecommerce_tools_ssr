// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcx3DHl6WbEe0vZIDSTvekZXCUadrFcJs",
  authDomain: "ecommerce-tools.firebaseapp.com",
  projectId: "ecommerce-tools",
  storageBucket: "ecommerce-tools.appspot.com",
  messagingSenderId: "353641760521",
  appId: "1:353641760521:web:0e6de01d4b71cb42a1f5d8",
  measurementId: "G-16Q3SDC02S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
// const analytics = getAnalytics(app);
const auth = getAuth();

export { db, auth };
