// Track shipment and update UI
document.getElementById("trackingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const trackingId = document.getElementById("trackingInput").value.trim();
  if (!trackingId) return;

  firebase.database().ref("shipments/" + trackingId).once("value")
    .then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        // Show tracking result
        document.getElementById("trackingResult").classList.remove("hidden");

        // Fill details
        document.getElementById("resultTrackingId").textContent = trackingId;
        document.getElementById("resultClientName").textContent = data.clientName || "N/A";
        document.getElementById("resultOrigin").textContent = data.origin || "N/A";
        document.getElementById("resultDestination").textContent = data.destination || "N/A";
        document.getElementById("resultStatus").textContent = data.status || "Pending";

        // Update progress bar
        updateProgress(data.status);

        // Show proof of delivery if available
        if (data.proofOfDelivery) {
          document.getElementById("proofContainer").classList.remove("hidden");
          document.getElementById("proofImage").src = data.proofOfDelivery;
        } else {
          document.getElementById("proofContainer").classList.add("hidden");
        }

        // Update live map if location exists
        if (data.location && data.location.lat && data.location.lng) {
          updateMap(data.location.lat, data.location.lng);
        }
      } else {
        alert("No shipment found with Tracking ID: " + trackingId);
      }
    });
});

// Progress bar handler
function updateProgress(status) {
  const steps = ["Order Placed", "Processing", "Shipped", "Delivered"];
  steps.forEach((step, index) => {
    const stepElement = document.getElementById("step" + (index + 1));
    if (steps.indexOf(status) >= index) {
      stepElement.classList.add("active");
    } else {
      stepElement.classList.remove("active");
    }
  });
}

// Google Maps
let map, marker;
function initMap() {
  const defaultPos = { lat: 14.5995, lng: 120.9842 }; // Manila default
  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultPos,
    zoom: 6,
  });
  marker = new google.maps.Marker({
    position: defaultPos,
    map: map,
    title: "Shipment Location",
  });
}

function updateMap(lat, lng) {
  const newPos = { lat, lng };
  map.setCenter(newPos);
  map.setZoom(10);
  marker.setPosition(newPos);
}
