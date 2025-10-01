// Handle login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Redirect to admin dashboard
      window.location.href = "admin.html";
    })
    .catch(error => {
      document.getElementById("errorMsg").innerText = error.message;
    });
});

// Check auth state
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("Logged in as:", user.email);
  } else {
    console.log("Not logged in");
  }
});
