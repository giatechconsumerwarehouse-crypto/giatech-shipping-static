import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { auth } from "./firebase.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("loginMessage").textContent = "✅ Login successful!";
    window.location.href = "admin.html"; // redirect to admin panel
  } catch (error) {
    console.error("Login error:", error.message);
    document.getElementById("loginMessage").textContent = "❌ Invalid credentials!";
  }
});
