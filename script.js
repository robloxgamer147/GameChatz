document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const loginSignupBtn = document.getElementById('loginSignupBtn');

  // Redirect from index.html to signup.html
  if (loginSignupBtn) {
    loginSignupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'signup.html';
    });
  }

  // Redirect from signup.html to index.html after "signing up"
  if (signupBtn) {
    signupBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Get values (optional for real Firebase auth)
      const username = document.getElementById('signupUsername')?.value;
      const password = document.getElementById('signupPassword')?.value;
      const confirmPassword = document.getElementById('confirmPassword')?.value;

      if (!username || !password || !confirmPassword) {
        alert("Please fill all fields.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      // Save user to localStorage (for testing only)
      localStorage.setItem('gamechatzUser', username);

      window.location.href = 'index.html';
    });
  }

  // Redirect from login.html to index.html after "logging in"
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const username = document.getElementById('loginUsername')?.value;
      const password = document.getElementById('loginPassword')?.value;

      if (!username || !password) {
        alert("Please fill in both fields.");
        return;
      }

      // Save user to localStorage (simulate login)
      localStorage.setItem('gamechatzUser', username);

      window.location.href = 'index.html';
    });
  }

  // Show logged-in username on index.html
  const usernameDisplay = document.getElementById('usernameDisplay');
  if (usernameDisplay) {
    const savedUser = localStorage.getItem('gamechatzUser');
    if (savedUser) {
      usernameDisplay.textContent = savedUser;
    } else {
      // Redirect to login if no user
      window.location.href = 'login.html';
    }
  }

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('gamechatzUser');
      window.location.href = 'login.html';
    });
  }
});
