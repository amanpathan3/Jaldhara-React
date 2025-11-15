// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 🔹 Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAMO2ZVdacXX-c-bGGzup-vh1m6L8VBH88",
  authDomain: "jaldhara-a6d13.firebaseapp.com",
  projectId: "jaldhara-a6d13",
  storageBucket: "jaldhara-a6d13.firebasestorage.app",
  messagingSenderId: "466655820326",
  appId: "1:466655820326:web:988cd2cb5e3d07fc4bc4e7",
  measurementId: "G-FNQ5J3VTE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
