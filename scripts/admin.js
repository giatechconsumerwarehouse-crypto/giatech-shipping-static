import { ref, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { db } from "./firebase.js";

// ✅ Handle form submission
document.getElementById("shipmentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const trackingNumber = document.getElementById("trackingNumber").value.trim();
  const status = document.getElementById("status").value;
  const location = document.getElementById("location").value.trim();

  if (!trackingNumber || !status || !location) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  // ✅ Save to Firebase
  try {
    await set(ref(db, "shipments/" + trackingNumber), {
      status: status,
      location: location,
      updatedAt: new Date().toLocaleString()
    });

    alert(`✅ Shipment ${trackingNumber} updated successfully!`);
    document.getElementById("shipmentForm").reset();

  } catch (error) {
    console.error("Error updating shipment:", error);
    alert("❌ Failed to update shipment. Try again.");
  }
});
