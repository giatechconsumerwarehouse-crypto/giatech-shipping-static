// Import Firebase from firebase.js
import { db } from "./firebase.js";
import { ref, set, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const form = document.getElementById("adminForm");
const resultBox = document.getElementById("adminResult");

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect form data
  const trackingId = document.getElementById("trackingId").value.trim();
  const customerName = document.getElementById("customerName").value.trim();
  const status = document.getElementById("status").value;
  const location = document.getElementById("location").value.trim();

  if (!trackingId || !customerName) {
    alert("Tracking ID and Customer Name are required.");
    return;
  }

  try {
    // Save or update shipment in Firebase
    await set(ref(db, "shipments/" + trackingId), {
      customerName: customerName,
      status: status,
      location: location,
      lastUpdated: new Date().toISOString()
    });

    // Show confirmation
    resultBox.style.display = "block";
    resultBox.innerHTML = `
      ✅ Shipment <strong>${trackingId}</strong> updated!<br>
      Customer: ${customerName}<br>
      Status: ${status}<br>
      Location: ${location}
    `;

    // Reset form
    form.reset();

  } catch (error) {
    console.error("Error updating shipment:", error);
    alert("Failed to update shipment. Check console.");
  }
});
