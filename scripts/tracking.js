// scripts/tracking.js
import { db } from "./firebase.js";
import { ref, get, child } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Elements
const trackBtn = document.getElementById("trackBtn");
const trackingNumberInput = document.getElementById("trackingNumber");
const resultContainer = document.getElementById("trackingResult");

// Track button click
trackBtn.addEventListener("click", async () => {
  const trackingNumber = trackingNumberInput.value.trim();
  if (!trackingNumber) {
    resultContainer.innerHTML = "<p style='color:red;'>Please enter a tracking number.</p>";
    return;
  }

  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `shipments/${trackingNumber}`));

    if (snapshot.exists()) {
      const data = snapshot.val();

      // Display shipment info
      resultContainer.innerHTML = `
        <div class="shipment-info">
          <h3>Shipment Details</h3>
          <p><strong>Status:</strong> ${data.status}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          <p><strong>ETA:</strong> ${data.eta}</p>
          <div class="progress-bar">
            <div class="progress" style="width: ${data.progress || 0}%;"></div>
          </div>
        </div>
      `;
    } else {
      resultContainer.innerHTML = "<p style='color:red;'>Tracking number not found.</p>";
    }
  } catch (error) {
    console.error(error);
    resultContainer.innerHTML = "<p style='color:red;'>Error retrieving data. Please try again later.</p>";
  }
});
