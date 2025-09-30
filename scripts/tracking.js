// scripts/tracking.js
// Fetch shipment status from Firebase in real-time

document.getElementById("trackForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const trackingNumber = document.getElementById("trackingNumber").value.trim();
  const statusDiv = document.getElementById("trackingResult");

  if (!trackingNumber) {
    statusDiv.innerHTML = "<p class='error'>⚠️ Please enter a tracking number.</p>";
    return;
  }

  // Listen for changes in shipment data (live update)
  const shipmentRef = db.ref("shipments/" + trackingNumber);
  shipmentRef.on("value", (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      statusDiv.innerHTML = `
        <h3>📦 Tracking Number: ${trackingNumber}</h3>
        <p><strong>Status:</strong> ${data.status}</p>
        <p><strong>Location:</strong> ${data.location}</p>
      `;
    } else {
      statusDiv.innerHTML = `<p class='error'>❌ No shipment found for: ${trackingNumber}</p>`;
    }
  });
});
