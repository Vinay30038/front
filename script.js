document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  // Error message spans
  const usernameError = document.getElementById("usernameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmError = document.getElementById("confirmError");
  const successMsg = document.getElementById("successMsg");

  // Reset errors
  usernameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmError.textContent = "";
  successMsg.textContent = "";

  let valid = true;

  // Username validation
  if (username.length < 4) {
    usernameError.textContent = "Username must be at least 4 characters.";
    valid = false;
  }

  // Email validation (simple regex)
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    emailError.textContent = "Enter a valid email address.";
    valid = false;
  }

  // Password validation
  if (password.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters.";
    valid = false;
  }

  // Confirm password
  if (confirmPassword !== password) {
    confirmError.textContent = "Passwords do not match.";
    valid = false;
  }

  // If valid
  if (valid) {
    successMsg.textContent = "✅ Registration successful!";
    document.getElementById("registerForm").reset();
  }
});
