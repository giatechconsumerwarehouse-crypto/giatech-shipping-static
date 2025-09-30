import { db } from "./scripts/firebase.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// DOM elements
const form = document.getElementById("tracking-form");
const resultBox = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

// Shipment steps
const steps = ["Processing", "In Transit", "At Destination", "Delivered"];

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const trackingId = document.getElementById("trackingId").value.trim();
  if (!trackingId) {
    resultBox.textContent = "⚠️ Please enter a tracking ID.";
    return;
  }

  try {
    const snapshot = await get(ref(db, "shipments/" + trackingId));

    if (snapshot.exists()) {
      const data = snapshot.val();
      const status = data.status;

      resultBox.textContent = `Shipment Status: ${status}`;

      // Find which step the status is on
      const stepIndex = steps.indexOf(status);

      if (stepIndex !== -1) {
        // Progress = (stepIndex / totalSteps) * 100
        const progressPercent = ((stepIndex + 1) / steps.length) * 100;
        progressBar.style.width = progressPercent + "%";
        progressText.textContent = `Current Stage: ${status}`;
      } else {
        progressBar.style.width = "0%";
        progressText.textContent = "Unknown status.";
      }
    } else {
      resultBox.textContent = "❌ Tracking ID not found.";
      progressBar.style.width = "0%";
      progressText.textContent = "";
    }
  } catch (error) {
    console.error(error);
    resultBox.textContent = "⚠️ Error retrieving tracking information.";
  }
});
