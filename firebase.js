// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBuLyGwCrPY26ohmHY4YwLVwF0dlAfkzak",
  authDomain: "gamechatz-e61e7.firebaseapp.com",
  databaseURL: "https://gamechatz-e61e7-default-rtdb.firebaseio.com",
  projectId: "gamechatz-e61e7",
  storageBucket: "gamechatz-e61e7.appspot.com",
  messagingSenderId: "155399717230",
  appId: "1:155399717230:web:ae414fa8739baf63d0c17f",
  measurementId: "G-5XW4J2BQ7N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, ref, set };
