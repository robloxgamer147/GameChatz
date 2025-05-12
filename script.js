import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, ref, set } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname;

  if (currentPage.endsWith("login.html")) {
    const loginBtn = document.getElementById("loginBtn");
    loginBtn?.addEventListener("click", () => {
      const email = document.getElementById("loginUsername")?.value.trim();
      const password = document.getElementById("loginPassword")?.value.trim();

      if (!email || !password) {
        alert("Please fill all fields.");
        return;
      }

      signInWithEmailAndPassword(auth, email + "@gamechatz.fake", password)
        .then((userCredential) => {
          localStorage.setItem("username", email);
          window.location.href = "index.html";
        })
        .catch((error) => {
          alert("Login error: " + error.message);
        });
    });
  } else if (currentPage.endsWith("signup.html")) {
    const signupBtn = document.getElementById("signupBtn");
    signupBtn?.addEventListener("click", () => {
      const email = document.getElementById("signupUsername")?.value.trim();
      const password = document.getElementById("signupPassword")?.value.trim();
      const confirm = document.getElementById("confirmPassword")?.value.trim();

      if (!email || !password || !confirm) {
        alert("Please fill all fields.");
        return;
      }

      if (password !== confirm) {
        alert("Passwords do not match.");
        return;
      }

      createUserWithEmailAndPassword(auth, email + "@gamechatz.fake", password)
        .then((userCredential) => {
          const user = userCredential.user;
          set(ref(db, "users/" + user.uid), { username: email });
          localStorage.setItem("username", email);
          window.location.href = "index.html";
        })
        .catch((error) => {
          alert("Sign-up error: " + error.message);
        });
    });
  } else if (currentPage.endsWith("index.html")) {
    const username = localStorage.getItem("username");
    const display = document.getElementById("usernameDisplay");
    const logoutBtn = document.getElementById("logoutBtn");

    if (!username) {
      window.location.href = "login.html";
    } else {
      display.textContent = username;
    }

    logoutBtn?.addEventListener("click", () => {
      localStorage.removeItem("username");
      window.location.href = "login.html";
    });
  }
});
