// ✅ Import Firebase tools
import { ref, get, child } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { db } from "./firebase.js";

// ✅ Function to handle tracking search
window.trackShipment = async function () {
  const trackingNumber = document.getElementById("trackingNumber").value.trim();

  if (!trackingNumber) {
    alert("⚠️ Please enter a tracking number.");
    return;
  }

  try {
    // Reference to Firebase DB
    const dbRef = ref(db);

    // Get shipment data
    const snapshot = await get(child(dbRef, `shipments/${trackingNumber}`));

    if (snapshot.exists()) {
      const data = snapshot.val();

      // Show progress bar + details
      document.getElementById("progressContainer").style.display = "flex";
      document.getElementById("shipmentDetails").style.display = "block";

      // ✅ Update details
      document.getElementById("detailTrackingNumber").textContent = trackingNumber;
      document.getElementById("detailStatus").textContent = data.status || "Unknown";
      document.getElementById("detailLocation").textContent = data.location || "Not available";
      document.getElementById("detailUpdated").textContent = data.updatedAt || "N/A";

      // ✅ Update progress bar steps
      updateProgressBar(data.status);

    } else {
      alert("❌ Tracking number not found. Please check again.");
      document.getElementById("progressContainer").style.display = "none";
      document.getElementById("shipmentDetails").style.display = "none";
    }

  } catch (error) {
    console.error("Error fetching shipment:", error);
    alert("⚠️ Error loading shipment details.");
  }
};

// ✅ Function to highlight progress bar
function updateProgressBar(status) {
  // Reset all steps
  const steps = ["step1", "step2", "step3", "step4"];
  steps.forEach(step => {
    document.getElementById(step).classList.remove("active");
  });

  // Map statuses to step numbers
  let stepIndex = 0;
  switch (status?.toLowerCase()) {
    case "order placed":
      stepIndex = 1;
      break;
    case "processing":
      stepIndex = 2;
      break;
    case "shipped":
      stepIndex = 3;
      break;
    case "delivered":
      stepIndex = 4;
      break;
    default:
      stepIndex = 1;
  }

  // Activate steps up to current
  for (let i = 1; i <= stepIndex; i++) {
    document.getElementById(`step${i}`).classList.add("active");
  }
}
