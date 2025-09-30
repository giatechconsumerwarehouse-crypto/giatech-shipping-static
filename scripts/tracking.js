// Import Firebase
import { db } from "./firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const form = document.getElementById("trackingForm");
const resultBox = document.getElementById("trackingResult");

// Handle tracking form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const trackingId = document.getElementById("trackingIdInput").value.trim();
  if (!trackingId) return;

  // Reference to shipment in Firebase
  const shipmentRef = ref(db, "shipments/" + trackingId);

  // Listen for live updates
  onValue(shipmentRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();

      // Update shipment info
      document.getElementById("customerName").innerText = data.customerName || "N/A";
      document.getElementById("currentLocation").innerText = data.location || "N/A";
      document.getElementById("currentStatus").innerText = data.status || "N/A";
      document.getElementById("lastUpdated").innerText = data.lastUpdated
        ? new Date(data.lastUpdated).toLocaleString()
        : "N/A";

      // Show box
      resultBox.style.display = "block";

      // Update progress bar
      updateProgress(data.status);
    } else {
      alert("No shipment found with Tracking ID: " + trackingId);
    }
  });
});

// Function to highlight progress bar
function updateProgress(status) {
  const steps = ["Order Placed", "Processing", "Shipped", "Delivered"];
  steps.forEach((step, index) => {
    const element = document.getElementById("step" + (index + 1));
    if (steps.indexOf(status) >= index) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}
