// Import Firebase config
import { db } from "./firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Handle tracking form submit
document.getElementById("tracking-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const trackingId = document.getElementById("trackingId").value.trim();
    if (!trackingId) return;

    const shipmentRef = ref(db, "shipments/" + trackingId);

    // Listen for real-time updates
    onValue(shipmentRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();

            // Show shipment details
            document.getElementById("result").innerHTML = `
                <p><strong>Status:</strong> ${data.status}</p>
                <p><strong>Location:</strong> ${data.location}</p>
            `;

            // Update progress bar
            updateProgressBar(data.status);
        } else {
            document.getElementById("result").innerHTML = `
                <p>No record found for ID: ${trackingId}</p>
            `;
            updateProgressBar(""); // Reset bar if no record
        }
    });
});

// Progress bar function
function updateProgressBar(status) {
    const bar = document.getElementById("progress");
    const barText = document.getElementById("progress-text");
    let percent = 0;

    switch (status) {
        case "Processing":
            percent = 25;
            break;
        case "In Transit":
            percent = 50;
            break;
        case "At Destination":
            percent = 75;
            break;
        case "Delivered":
            percent = 100;
            break;
        default:
            percent = 0;
    }

    bar.style.width = percent + "%";
    barText.textContent = status ? `${status} (${percent}%)` : "No progress yet";
}
