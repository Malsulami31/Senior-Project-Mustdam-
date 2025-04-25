
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfYIZRvz_OUfrRupdaAa7MEgE1we1wbhU",
  authDomain: "mustdam-aaf69.firebaseapp.com",
  databaseURL: "https://mustdam-aaf69-default-rtdb.firebaseio.com",
  projectId: "mustdam-aaf69",
  storageBucket: "mustdam-aaf69.firebasestorage.app",
  messagingSenderId: "715137979776",
  appId: "1:715137979776:web:918908b9d9519015629d65",
  measurementId: "G-8K7RTVMDNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
 const auth=getAuth();
export default app;
export { auth, db };