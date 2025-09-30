// scripts/tracking.js

let map;
let marker;

// Initialize Google Map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 14.5995, lng: 120.9842 }, // Default Manila
    zoom: 6,
  });
}

// Listen to form submit
document.getElementById("trackingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const trackingId = document.getElementById("trackingInput").value.trim();
  if (!trackingId) {
    alert("Please enter a Tracking ID");
    return;
  }

  const shipmentRef = firebase.database().ref("shipments/" + trackingId);

  shipmentRef.on("value", (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      document.getElementById("trackingResult").classList.remove("hidden");

      // Fill details
      document.getElementById("clientName").textContent = data.clientName || "N/A";
      document.getElementById("origin").textContent = data.origin || "N/A";
      document.getElementById("destination").textContent = data.destination || "N/A";
      document.getElementById("status").textContent = data.status || "Pending";

      // Update progress bar
      updateProgressBar(data.status);

      // Update Map
      if (data.location && data.location.lat && data.location.lng) {
        const position = { lat: data.location.lat, lng: data.location.lng };
        map.setCenter(position);
        map.setZoom(12);

        if (marker) {
          marker.setPosition(position);
        } else {
          marker = new google.maps.Marker({
            position: position,
            map: map,
            title: "Shipment Location",
          });
        }
      }

      // Show Proof of Delivery if available
      if (data.proofUrl) {
        document.getElementById("proofSection").classList.remove("hidden");
        document.getElementById("proofImage").src = data.proofUrl;
      } else {
        document.getElementById("proofSection").classList.add("hidden");
      }

    } else {
      alert("No shipment found with Tracking ID: " + trackingId);
    }
  });
});

// Progress Bar Update Function
function updateProgressBar(status) {
  const steps = ["Order Placed", "Processing", "Shipped", "Delivered"];
  steps.forEach((step, index) => {
    const circle = document.querySelector(`#step-${index + 1} .step-circle`);
    if (steps.indexOf(status) >= index) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });
}
