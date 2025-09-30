// scripts/admin.js
import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// --- Login page ---
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;
    const message = document.getElementById("loginMessage");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "admin.html";
    } catch (error) {
      message.innerHTML = `<p style='color:red;'>${error.message}</p>`;
    }
  });
}

// --- Admin dashboard ---
const form = document.getElementById("shipmentForm");
if (form) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const trackingNumber = document.getElementById("trackingNumber").value;
    const shipmentData = {
      origin: document.getElementById("origin").value,
      destination: document.getElementById("destination").value,
      status: document.getElementById("status").value,
      eta: document.getElementById("eta").value,
      progress: parseInt(document.getElementById("progress").value)
    };
    try {
      await set(ref(db, `shipments/${trackingNumber}`), shipmentData);
      document.getElementById("adminMessage").innerHTML = "<p style='color:green;'>Shipment saved!</p>";
      form.reset();
    } catch (error) {
      console.error(error);
    }
  });

  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}
