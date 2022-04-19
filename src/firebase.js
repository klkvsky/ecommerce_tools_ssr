import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-xXuLNVT6kWgzGWq5fMTuZL6YDE2thNE",
  authDomain: "ecommercetools-b88ac.firebaseapp.com",
  projectId: "ecommercetools-b88ac",
  storageBucket: "ecommercetools-b88ac.appspot.com",
  messagingSenderId: "716401005154",
  appId: "1:716401005154:web:c7883916ad929bd8f0773b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
// const auth = getAuth();

export { db };
