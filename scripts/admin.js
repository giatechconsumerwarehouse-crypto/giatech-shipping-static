// scripts/admin.js

document.addEventListener("DOMContentLoaded", () => {
  const addShipmentForm = document.getElementById("addShipmentForm");

  addShipmentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const trackingId = document.getElementById("trackingId").value.trim();
    const clientName = document.getElementById("clientName").value.trim();
    const origin = document.getElementById("origin").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const status = document.getElementById("status").value;
    const lat = parseFloat(document.getElementById("lat").value);
    const lng = parseFloat(document.getElementById("lng").value);
    const proofUrl = document.getElementById("proofUrl").value.trim();

    if (!trackingId) {
      alert("Tracking ID is required");
      return;
    }

    const shipmentData = {
      clientName,
      origin,
      destination,
      status,
      location: {
        lat: isNaN(lat) ? null : lat,
        lng: isNaN(lng) ? null : lng,
      },
      proofUrl: proofUrl || null,
      lastUpdated: new Date().toISOString(),
    };

    firebase
      .database()
      .ref("shipments/" + trackingId)
      .set(shipmentData)
      .then(() => {
        alert("Shipment updated successfully!");
        addShipmentForm.reset();
      })
      .catch((error) => {
        console.error("Error updating shipment:", error);
        alert("Error: " + error.message);
      });
  });
});

// Optional: Logout admin
document.getElementById("logoutBtn").addEventListener("click", () => {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
});
