// Firebase Authentication & Database Setup
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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Handle login form submission
document.getElementById('login-form')?.addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  auth.signInWithEmailAndPassword(username + "@gamechatz.com", password)
    .then(userCredential => {
      alert('Logged in successfully!');
      window.location.href = 'index.html';
    })
    .catch(error => alert(error.message));
});

// Handle sign up form submission
document.getElementById('signup-form')?.addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  if (password === confirmPassword) {
    auth.createUserWithEmailAndPassword(username + "@gamechatz.com", password)
      .then(userCredential => {
        alert('Account created successfully!');
        window.location.href = 'login.html';
      })
      .catch(error => alert(error.message));
  } else {
    alert("Passwords do not match.");
  }
});

// Handle authentication state changes
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById('welcome-message').textContent = `Welcome, ${user.displayName || 'User'}`;
    document.getElementById('auth-button').textContent = 'Logout';
    document.getElementById('auth-button').onclick = logout;
  } else {
    document.getElementById('welcome-message').textContent = 'Welcome to GameChatz';
    document.getElementById('auth-button').textContent = 'Login / Sign Up';
    document.getElementById('auth-button').onclick = showAuthForm;
  }
});

// Show login/signup form
function showAuthForm() {
  window.location.href = 'login.html';
}

// Logout function
function logout() {
  auth.signOut()
    .then(() => {
      alert('Logged out successfully!');
      window.location.href = 'index.html';
    })
    .catch(error => alert(error.message));
}
