// Import Firebase
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { app } from "./scripts/firebase.js";

const db = getDatabase(app);

// Function to track order
document.getElementById("trackForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const trackingId = document.getElementById("trackingId").value;

  const snapshot = await get(ref(db, "tracking/" + trackingId));
  if (snapshot.exists()) {
    const data = snapshot.val();

    // Fill result
    document.getElementById("res-id").innerText = trackingId;
    document.getElementById("res-updated").innerText = new Date(data.updatedAt).toLocaleString();
    document.getElementById("result").style.display = "block";

    // Reset all steps
    resetSteps();

    // Activate steps based on status
    if (data.status === "Order Placed") activateStep(1);
    if (data.status === "Processing") activateStep(2);
    if (data.status === "Shipped") activateStep(3);
    if (data.status === "Delivered") activateStep(4);
  } else {
    alert("Tracking ID not found");
  }
});

// Reset steps
function resetSteps() {
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`step-${i}`).classList.remove("active");
  }
}

// Activate step
function activateStep(stepNumber) {
  resetSteps();
  for (let i = 1; i <= stepNumber; i++) {
    document.getElementById(`step-${i}`).classList.add("active");
  }

  // Animate lines
  const lines = document.querySelectorAll(".progress-line");
  lines.forEach((line, index) => {
    if (index < stepNumber - 1) {
      line.querySelector("::after"); // ensures transition triggers
      line.style.setProperty("--line-fill", "100%");
    }
  });
}

