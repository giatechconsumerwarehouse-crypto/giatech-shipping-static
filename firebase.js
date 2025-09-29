// Import from firebase.js
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } 
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

/* ===============================
   LOGIN PAGE (login.html)
================================= */
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // ✅ Redirect to Admin page after login
        window.location.href = "admin.html";
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
      });
  });
}

/* ===============================
   ADMIN PAGE (admin.html)
   Protect the page → Redirect if not logged in
================================= */
const logoutBtn = document.getElementById("logout-btn");

if (window.location.pathname.includes("admin.html")) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // Not logged in → go back to login
      window.location.href = "login.html";
    }
  });
}

// ✅ Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    });
  });
}
