// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj1bUkOr7RbfA_g9clX0CTjIzyBeaZRI4",
  authDomain: "chattis-b71b9.firebaseapp.com",
  projectId: "chattis-b71b9",
  storageBucket: "chattis-b71b9.appspot.com",
  messagingSenderId: "207416574866",
  appId: "1:207416574866:web:570344084e24686ef3374b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();