// ===============================
// Admin Panel Script
// ===============================

// Ensure Firebase is initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();
const storage = firebase.storage();

// ===============================
// Add Shipment
// ===============================
document.getElementById("addShipmentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const trackingId = document.getElementById("trackingId").value.trim();
  const clientName = document.getElementById("clientName").value.trim();
  const origin = document.getElementById("origin").value.trim();
  const destination = document.getElementById("destination").value.trim();
  const status = document.getElementById("status").value;

  if (!trackingId || !clientName) {
    alert("Tracking ID and Client Name are required.");
    return;
  }

  const shipmentData = {
    trackingId,
    clientName,
    origin,
    destination,
    status,
    createdAt: new Date().toISOString()
  };

  database.ref("shipments/" + trackingId).set(shipmentData)
    .then(() => {
      alert("Shipment added successfully!");
      document.getElementById("addShipmentForm").reset();
    })
    .catch((error) => {
      console.error("Error adding shipment:", error);
    });
});

// ===============================
// Update Shipment Status
// ===============================
function updateStatus(trackingId, newStatus) {
  database.ref("shipments/" + trackingId).update({
    status: newStatus,
    updatedAt: new Date().toISOString()
  })
    .then(() => {
      alert("Status updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating status:", error);
    });
}

// ===============================
// Upload Proof of Delivery
// ===============================
function uploadProof() {
  const trackingId = document.getElementById("proofTrackingId").value.trim();
  const file = document.getElementById("proofFile").files[0];

  if (!trackingId || !file) {
    alert("Please provide a Tracking ID and select a file.");
    return;
  }

  const storageRef = storage.ref("proofs/" + trackingId + "/" + file.name);

  storageRef.put(file)
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((downloadURL) => {
      return database.ref("shipments/" + trackingId).update({
        proofUrl: downloadURL,
        proofUploadedAt: new Date().toISOString()
      });
    })
    .then(() => {
      alert("Proof uploaded successfully!");
      document.getElementById("proofTrackingId").value = "";
      document.getElementById("proofFile").value = "";
    })
    .catch((error) => {
      console.error("Error uploading proof:", error);
      alert("Failed to upload proof. Try again.");
    });
}
