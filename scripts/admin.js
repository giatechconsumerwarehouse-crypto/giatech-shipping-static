import { ref, set, get, child } from "./scripts/firebase.js";

// Function to save shipment
window.saveShipment = async function () {
  const trackingId = document.getElementById("trackingId").value.trim();
  const clientName = document.getElementById("clientName").value.trim();
  const status = document.getElementById("status").value; // dropdown now
  const location = document.getElementById("location").value.trim();
  const stopped = document.getElementById("stopped").checked;

  const resultBox = document.getElementById("adminResult");
  resultBox.innerHTML = "";

  if (!trackingId) {
    resultBox.innerHTML = "<p class='error'>⚠️ Tracking ID is required.</p>";
    return;
  }

  try {
    await set(ref(window.database, "shipments/" + trackingId), {
      clientName,
      status,
      location,
      stopped,
    });

    resultBox.innerHTML = "<p class='success'>✅ Shipment updated successfully.</p>";
  } catch (error) {
    console.error(error);
    resultBox.innerHTML = "<p class='error'>❌ Error saving shipment.</p>";
  }
};

// Function to fetch existing shipment
window.fetchShipment = async function () {
  const trackingId = document.getElementById("trackingId").value.trim();
  const resultBox = document.getElementById("adminResult");

  if (!trackingId) {
    resultBox.innerHTML = "<p class='error'>⚠️ Enter Tracking ID to fetch.</p>";
    return;
  }

  try {
    const dbRef = ref(window.database);
    const snapshot = await get(child(dbRef, `shipments/${trackingId}`));

    if (snapshot.exists()) {
      const data = snapshot.val();

      document.getElementById("clientName").value = data.clientName || "";
      document.getElementById("status").value = data.status || "Order Placed";
      document.getElementById("location").value = data.location || "";
      document.getElementById("stopped").checked = data.stopped || false;

      resultBox.innerHTML = "<p class='success'>📦 Shipment data loaded.</p>";
    } else {
      resultBox.innerHTML = "<p class='error'>❌ No shipment found with this ID.</p>";
    }
  } catch (error) {
    console.error(error);
    resultBox.innerHTML = "<p class='error'>⚠️ Error fetching shipment data.</p>";
  }
};
