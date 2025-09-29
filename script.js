import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// ---------- LOGIN LOGIC ----------
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful ✅");
      window.location.href = "admin.html"; // redirect to admin panel
    } catch (error) {
      alert("Login failed ❌ " + error.message);
    }
  });
}

// ---------- LOGOUT LOGIC ----------
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully ✅");
      window.location.href = "login.html"; // back to login page
    } catch (error) {
      alert("Logout error ❌ " + error.message);
    }
  });
}

// ---------- PROTECT ADMIN PAGE ----------
if (window.location.pathname.includes("admin.html")) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // if not logged in, send back to login page
      window.location.href = "login.html";
    }
  });
}
