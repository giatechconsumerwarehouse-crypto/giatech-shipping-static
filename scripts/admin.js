// scripts/admin.js
import { auth, db } from "./firebase.js";
import { 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  ref, set, update 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Select DOM elements
const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const logoutBtn = document.getElementById("logoutBtn");

const addShipmentForm = document.getElementById("addShipmentForm");
const updateShipmentForm = document.getElementById("updateShipmentForm");
const stopShipmentForm = document.getElementById("stopShipmentForm");

// -------------------- LOGIN --------------------
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      loginMessage.textContent = "Login successful!";
      loginSection.style.display = "none";
      dashboardSection.style.display = "block";
    })
    .catch((error) => {
      loginMessage.textContent = "Login failed: " + error.message;
    });
});

// -------------------- LOGOUT --------------------
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    loginSection.style.display = "block";
    dashboardSection.style.display = "none";
    loginMessage.textContent = "You have logged out.";
  });
});

// -------------------- ADD SHIPMENT --------------------
addShipmentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const trackingNumber = document.getElementById("trackingNumber").value;
  const clientName = document.getElementById("clientName").value;
  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;

  set(ref(db, "shipments/" + trackingNumber), {
    clientName: clientName,
    origin: origin,
    destination: destination,
    status: "Pending",
    stopped: false,
    lastUpdated: new Date().toISOString()
  })
    .then(() => {
      alert("Shipment added successfully!");
      addShipmentForm.reset();
    })
    .catch((error) => {
      alert("Error adding shipment: " + error.message);
    });
});

// -------------------- UPDATE SHIPMENT --------------------
updateShipmentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const trackingNumber = document.getElementById("updateTrackingNumber").value;
  const status = document.getElementById("shipmentStatus").value;

  update(ref(db, "shipments/" + trackingNumber), {
    status: status,
    lastUpdated: new Date().toISOString()
  })
    .then(() => {
      alert("Shipment status updated!");
      updateShipmentForm.reset();
    })
    .catch((error) => {
      alert("Error updating shipment: " + error.message);
    });
});

// -------------------- STOP SHIPMENT --------------------
stopShipmentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const trackingNumber = document.getElementById("stopTrackingNumber").value;

  update(ref(db, "shipments/" + trackingNumber), {
    stopped: true,
    status: "Stopped",
    lastUpdated: new Date().toISOString()
  })
    .then(() => {
      alert("Shipment stopped successfully!");
      stopShipmentForm.reset();
    })
    .catch((error) => {
      alert("Error stopping shipment: " + error.message);
    });
});
        
