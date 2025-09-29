import { db } from "./firebase.js";
import {
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const trackForm = document.getElementById("track-form");
const resultBox = document.getElementById("tracking-result");

if (trackForm) {
  trackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const trackId = document.getElementById("trackId").value;

    if (!trackId) {
      alert("Please enter a tracking ID");
      return;
    }

    const shipmentRef = ref(db, "shipments/" + trackId);

    // Listen for real-time updates
    onValue(shipmentRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        resultBox.innerHTML = `
          <h2>Tracking ID: ${trackId}</h2>
          <p><strong>Status:</strong> ${data.status}</p>
          <p><strong>Last Updated:</strong> ${new Date(data.updatedAt).toLocaleString()}</p>
        `;
      } else {
        resultBox.innerHTML = `<p style="color:red;">No shipment found with this Tracking ID ❌</p>`;
      }
    });
  });
}
