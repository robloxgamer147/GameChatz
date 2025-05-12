// Ensure Firebase SDK is included and Firebase is initialized
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase config
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle "Sign Up / Login" button logic on index.html
const authButton = document.getElementById("auth-button");

if (authButton) {
  authButton.addEventListener("click", function () {
    // Redirect to the signup page
    window.location.href = "signup.html";
  });
}

// Handle login form submission on login.html
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, username + "@gamechatz.com", password)
      .then(userCredential => {
        console.log("Logged in successfully!");
        window.location.href = "chat.html"; // Redirect to chat page after login
      })
      .catch(error => {
        console.error(error);
        alert("Error logging in: " + error.message);
      });
  });
}

// Handle signup form submission on signup.html
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;

    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, username + "@gamechatz.com", password)
        .then(userCredential => {
          console.log("Account created successfully!");
          window.location.href = "chat.html"; // Redirect to chat page after signup
        })
        .catch(error => {
          console.error(error);
          alert("Error signing up: " + error.message);
        });
    } else {
      alert("Passwords do not match.");
    }
  });
}

// Log out function (for when user is logged in)
function logout() {
  signOut(auth)
    .then(() => {
      console.log("Logged out successfully!");
      window.location.href = "index.html"; // Redirect to home page after logout
    })
    .catch(error => {
      console.error(error);
      alert("Error logging out: " + error.message);
    });
}

// Check if user is logged in on page load
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in
    console.log("User is logged in: " + user.displayName);
  } else {
    // User is logged out
    console.log("User is logged out");
  }
});
