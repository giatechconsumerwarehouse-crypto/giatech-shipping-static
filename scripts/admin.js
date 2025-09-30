import { db } from "./scripts/firebase.js";
import { ref, set, get, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// DOM elements
const form = document.getElementById("admin-form");
const resultBox = document.getElementById("admin-result");

// Shipment steps
const steps = ["Processing", "In Transit", "At Destination", "Delivered"];

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const trackingId = document.getElementById("trackingId").value.trim();
  const status = document.getElementById("status").value;

  if (!trackingId || !status) {
    resultBox.textContent = "⚠️ Please enter both Tracking ID and Status.";
    return;
  }

  try {
    // Check if shipment already exists
    const shipmentRef = ref(db, "shipments/" + trackingId);
    const snapshot = await get(shipmentRef);

    if (snapshot.exists()) {
      // Update existing shipment
      await update(shipmentRef, { status: status });
      resultBox.textContent = `✅ Shipment ${trackingId} updated to "${status}".`;
    } else {
      // Create new shipment record
      await set(shipmentRef, {
        trackingId: trackingId,
        status: status,
        createdAt: new Date().toISOString()
      });
      resultBox.textContent = `🆕 Shipment ${trackingId} created with status "${status}".`;
    }
  } catch (error) {
    console.error(error);
    resultBox.textContent = "⚠️ Error updating shipment.";
  }
});
