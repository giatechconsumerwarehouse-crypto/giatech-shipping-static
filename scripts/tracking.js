// scripts/tracking.js
import { db } from "./firebase.js";
import { ref, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const trackBtn = document.getElementById("trackBtn");
const trackingInput = document.getElementById("trackingNumber");
const trackingResult = document.getElementById("trackingResult");

trackBtn.addEventListener("click", () => {
  const trackingNumber = trackingInput.value.trim();

  if (!trackingNumber) {
    trackingResult.innerHTML = "<p class='error'>⚠️ Please enter a tracking number.</p>";
    return;
  }

  const dbRef = ref(db);

  get(child(dbRef, `shipments/${trackingNumber}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const shipment = snapshot.val();

        let resultHTML = `
          <h3>Shipment Details</h3>
          <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
          <p><strong>Client Name:</strong> ${shipment.clientName || "N/A"}</p>
          <p><strong>Origin:</strong> ${shipment.origin || "N/A"}</p>
          <p><strong>Destination:</strong> ${shipment.destination || "N/A"}</p>
          <p><strong>Status:</strong> ${shipment.status}</p>
          <p><strong>Last Updated:</strong> ${shipment.lastUpdated || "N/A"}</p>
        `;

        if (shipment.stopped) {
          resultHTML += `<p class="stopped">⚠️ This shipment has been stopped by admin.</p>`;
        }

        trackingResult.innerHTML = resultHTML;
      } else {
        trackingResult.innerHTML = "<p class='error'>❌ Tracking number not found.</p>";
      }
    })
    .catch((error) => {
      trackingResult.innerHTML = `<p class='error'>Error fetching data: ${error.message}</p>`;
    });
});
