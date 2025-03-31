document.addEventListener("DOMContentLoaded", () => {
  const BACKEND_URL = "http://localhost:3000";
  const registerForm = document.getElementById("register");

  if (!registerForm) return;

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const postcode = document.getElementById("postcode").value.trim();
    const username = document.getElementById("username-reg").value.trim();
    const userType = document.getElementById("user-type").value.trim();
    const password = document.getElementById("password-reg").value.trim();
    const confirmPassword = document
      .getElementById("confirm-password")
      .value.trim();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !postcode ||
      !username ||
      !userType ||
      !password ||
      !confirmPassword
    ) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("⚠️ Passwords do not match.");
      return;
    }

    const userData = {
      email: username,
      password,
      first_name: firstName,
      surname: lastName,
      phone,
      street: address,
      house_no: postcode,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Registration failed: ${errorData.error || response.statusText}`
        );
      }

      alert("✅ Registration successful! You can now log in.");
      window.location.href = "../login/login.html"; // Redirect to login
    } catch (error) {
      alert("❌ Registration failed! " + error.message);
    }
  });
});
