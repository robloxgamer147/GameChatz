// Initialize Firebase (Firebase SDK)
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onChildAdded } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBuLyGwCrPY26ohmHY4YwLVwF0dlAfkzak",
    authDomain: "gamechatz-e61e7.firebaseapp.com",
    databaseURL: "https://gamechatz-e61e7-default-rtdb.firebaseio.com",
    projectId: "gamechatz-e61e7",
    storageBucket: "gamechatz-e61e7.firebasestorage.app",
    messagingSenderId: "155399717230",
    appId: "1:155399717230:web:ae414fa8739baf63d0c17f",
    measurementId: "G-5XW4J2BQ7N"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Handle user login
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error(error.message);
        });
});

// Handle user signup
document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const repeatPassword = document.getElementById("signup-repeat-password").value;

    if (password !== repeatPassword) {
        alert("Passwords do not match!");
        return;
    }

    createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error(error.message);
        });
});

// Handle logout
document.getElementById("logout-button").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        console.error(error.message);
    });
});
