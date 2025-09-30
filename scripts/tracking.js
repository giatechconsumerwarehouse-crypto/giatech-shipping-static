// tracking.js

// Function to initialize Google Map
function initMap() {
  // Default location: Manila, Philippines
  const defaultLocation = { lat: 14.5995, lng: 120.9842 };

  // Create the map centered on default location
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: defaultLocation,
  });

  // Create marker at the default location
  const marker = new google.maps.Marker({
    position: defaultLocation,
    map: map,
    title: "Shipment Location",
  });

  // Example static update (for testing, later replaced by Firebase live data)
  setTimeout(() => {
    const newLocation = { lat: 14.6760, lng: 121.0437 }; // Quezon City
    marker.setPosition(newLocation);
    map.setCenter(newLocation);
  }, 5000); // moves after 5 seconds
}

// Load map when window finishes loading
window.onload = initMap;
