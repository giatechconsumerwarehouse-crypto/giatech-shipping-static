// Import Firebase config
import { db } from "./firebase.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Handle admin form submit
document.getElementById("admin-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const trackingId = document.getElementById("admin-trackingId").value.trim();
    const status = document.getElementById("admin-status").value;
    const location = document.getElementById("admin-location").value.trim();

    if (!trackingId) {
        alert("Please enter a Tracking ID");
        return;
    }

    // Save data to Firebase
    set(ref(db, "shipments/" + trackingId), {
        status: status,
        location: location || "Unknown"
    })
    .then(() => {
        alert("Shipment updated successfully!");
        document.getElementById("admin-form").reset();
    })
    .catch((error) => {
        console.error("Error updating shipment:", error);
        alert("Failed to update shipment. Check console for details.");
    });
});
