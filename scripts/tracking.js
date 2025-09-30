import { ref, get, child } from "./scripts/firebase.js";

// Function to track shipment
window.trackShipment = async function () {
  const trackingId = document.getElementById("trackingId").value.trim();
  const trackingResult = document.getElementById("trackingResult");

  trackingResult.innerHTML = ""; // Clear previous result

  if (!trackingId) {
    trackingResult.innerHTML = "<p class='error'>⚠️ Please enter a tracking ID.</p>";
    return;
  }

  try {
    const dbRef = ref(window.database);
    const snapshot = await get(child(dbRef, `shipments/${trackingId}`));

    if (snapshot.exists()) {
      const data = snapshot.val();

      let resultHTML = `
        <h3>📦 Tracking Details</h3>
        <p><strong>Tracking ID:</strong> ${trackingId}</p>
        <p><strong>Client:</strong> ${data.clientName || "N/A"}</p>
        <p><strong>Status:</strong> ${data.status || "N/A"}</p>
        <p><strong>Location:</strong> ${data.location || "Unknown"}</p>
      `;

      // Add stopped warning if shipment is stopped
      if (data.stopped) {
        resultHTML += `<p class="stopped">⚠️ Shipment has been stopped by admin.</p>`;
      }

      // Add progress bar
      resultHTML += `
        <div class="progress-container">
          <div class="progress-bar" id="progressBar">0%</div>
        </div>
      `;

      trackingResult.innerHTML = resultHTML;

      // Update progress bar based on status
      const progressBar = document.getElementById("progressBar");

      let progress = 0;
      if (data.status) {
        switch (data.status.toLowerCase()) {
          case "order placed":
            progress = 25;
            break;
          case "in transit":
            progress = 50;
            break;
          case "out for delivery":
            progress = 75;
            break;
          case "delivered":
            progress = 100;
            break;
          default:
            progress = 10; // fallback
        }
      }

      progressBar.style.width = progress + "%";
      progressBar.textContent = progress + "%";
    } else {
      trackingResult.innerHTML = "<p class='error'>❌ No shipment found for this ID.</p>";
    }
  } catch (error) {
    console.error(error);
    trackingResult.innerHTML = "<p class='error'>⚠️ Error retrieving shipment data.</p>";
  }
};
