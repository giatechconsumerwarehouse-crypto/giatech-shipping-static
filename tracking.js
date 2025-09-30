// tracking.js

// Function to track shipment
async function trackShipment() {
  const trackingNumber = document.getElementById("trackingNumber").value.trim();
  const trackingResult = document.getElementById("trackingResult");
  const currentLocation = document.getElementById("currentLocation");

  if (!trackingNumber) {
    alert("Please enter a tracking number.");
    return;
  }

  try {
    const db = firebase.database();
    const shipmentRef = db.ref("shipments/" + trackingNumber);

    shipmentRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        // Show result section
        trackingResult.classList.remove("hidden");

        // Update progress bar
        updateProgress(data.status);

        // Update live location
        currentLocation.textContent = data.location || "Location not available";

      } else {
        alert("No shipment found for this tracking number.");
        trackingResult.classList.add("hidden");
      }
    });
  } catch (error) {
    console.error("Error tracking shipment:", error);
    alert("An error occurred while fetching tracking details.");
  }
}

// Function to update progress bar
function updateProgress(status) {
  const steps = ["Order Placed", "Processing", "Shipped", "Delivered"];
  const stepElements = [ 
    document.getElementById("step1"),
    document.getElementById("step2"),
    document.getElementById("step3"),
    document.getElementById("step4"),
  ];

  // Reset all steps
  stepElements.forEach((step) => {
    step.querySelector(".step-circle").classList.remove("active");
    step.querySelector(".step-circle").classList.remove("completed");
  });

  // Find index of current status
  const currentIndex = steps.indexOf(status);

  if (currentIndex !== -1) {
    // Mark all previous steps as completed
    for (let i = 0; i < currentIndex; i++) {
      stepElements[i].querySelector(".step-circle").classList.add("completed");
    }
    // Mark current step as active
    stepElements[currentIndex].querySelector(".step-circle").classList.add("active");
  }
}
