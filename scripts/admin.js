// scripts/admin.js
// Admin can update shipment info in Firebase

document.getElementById("updateForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const trackingNumber = document.getElementById("updateTrackingNumber").value.trim();
  const status = document.getElementById("updateStatus").value.trim();
  const location = document.getElementById("updateLocation").value.trim();
  const messageDiv = document.getElementById("updateMessage");

  if (!trackingNumber || !status || !location) {
    messageDiv.innerHTML = "<p class='error'>⚠️ Please fill in all fields.</p>";
    return;
  }

  // Save/update in Firebase
  db.ref("shipments/" + trackingNumber).set({
    status: status,
    location: location
  })
  .then(() => {
    messageDiv.innerHTML = "<p class='success'>✅ Shipment updated successfully!</p>";
  })
  .catch((error) => {
    messageDiv.innerHTML = `<p class='error'>❌ Error: ${error.message}</p>`;
  });
});
    
