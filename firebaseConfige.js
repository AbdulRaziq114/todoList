
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJeuTrGnwOL1pIWPXNJcmsCL1VnjUXvto",
  authDomain: "todo-app-9ffe7.firebaseapp.com",
  projectId: "todo-app-9ffe7",
  storageBucket: "todo-app-9ffe7.firebasestorage.app",
  messagingSenderId: "261859357980",
  appId: "1:261859357980:web:300edd5073c11572c3b6d9",
  measurementId: "G-9HDNMXETM3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { collection, addDoc, db, getDocs, updateDoc, deleteDoc, doc };