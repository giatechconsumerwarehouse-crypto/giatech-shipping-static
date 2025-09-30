// tracking.js

// Initialize Google Map
let map;
let marker;

function initMap() {
  // Default location (Manila) before Firebase loads
  const defaultLocation = { lat: 14.5995, lng: 120.9842 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: defaultLocation,
  });

  marker = new google.maps.Marker({
    position: defaultLocation,
    map: map,
    title: "Shipment Location",
  });

  // Start listening to Firebase for live updates
  listenForLocationUpdates();
}

// Listen for live location updates from Firebase
function listenForLocationUpdates() {
  const db = firebase.database();
  const locationRef = db.ref("shipment/location");

  locationRef.on("value", (snapshot) => {
    const data = snapshot.val();
    if (data && data.lat && data.lng) {
      const newLocation = { lat: data.lat, lng: data.lng };
      marker.setPosition(newLocation);
      map.setCenter(newLocation);
    }
  });
}

// Load map after page load
window.onload = initMap;
