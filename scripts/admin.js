// Protect admin page
firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html"; // redirect if not logged in
  }
});

// Create Shipment
document.getElementById("createShipmentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const trackingId = document.getElementById("trackingId").value.trim();
  const clientName = document.getElementById("clientName").value.trim();
  const origin = document.getElementById("origin").value.trim();
  const destination = document.getElementById("destination").value.trim();

  if (!trackingId) return alert("Tracking ID is required");

  firebase.database().ref("shipments/" + trackingId).set({
    clientName,
    origin,
    destination,
    status: "Order Placed",
    location: { lat: null, lng: null },
    proofOfDelivery: null
  }).then(() => {
    alert("Shipment created successfully!");
    document.getElementById("createShipmentForm").reset();
  });
});

// Update Shipment
document.getElementById("updateShipmentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const trackingId = document.getElementById("updateTrackingId").value.trim();
  const status = document.getElementById("statusSelect").value;
  const lat = document.getElementById("latitude").value;
  const lng = document.getElementById("longitude").value;
  const proofFile = document.getElementById("proofFile").files[0];

  if (!trackingId) return alert("Tracking ID required");

  let updates = {};
  if (status) updates.status = status;
  if (lat && lng) updates.location = { lat: parseFloat(lat), lng: parseFloat(lng) };

  if (proofFile) {
    const storageRef = firebase.storage().ref("proofs/" + trackingId + ".jpg");
    storageRef.put(proofFile).then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        updates.proofOfDelivery = url;
        firebase.database().ref("shipments/" + trackingId).update(updates).then(() => {
          alert("Shipment updated with proof of delivery!");
          document.getElementById("updateShipmentForm").reset();
        });
      });
    });
  } else {
    firebase.database().ref("shipments/" + trackingId).update(updates).then(() => {
      alert("Shipment updated successfully!");
      document.getElementById("updateShipmentForm").reset();
    });
  }
});

// Display all shipments live
firebase.database().ref("shipments").on("value", snapshot => {
  const tableBody = document.getElementById("shipmentsTable");
  tableBody.innerHTML = "";

  snapshot.forEach(child => {
    const data = child.val();
    const row = `
      <tr>
        <td>${child.key}</td>
        <td>${data.clientName || "N/A"}</td>
        <td>${data.origin || "N/A"}</td>
        <td>${data.destination || "N/A"}</td>
        <td>${data.status || "Pending"}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
});
