document.addEventListener("DOMContentLoaded", async () => {
  const BACKEND_URL = "http://localhost:3000";
  const accountForm = document.getElementById("account-form");

  const userId = localStorage.getItem("userId");
  if (!userId) {
    window.location.href = "../login/login.html";
    return;
  }

  // Fetch user data and pre-fill the form
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/${userId}`);
    console.log("Fetch user response status:", response.status);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to fetch user data: ${errorData.error || response.statusText}`
      );
    }
    const userData = await response.json();
    console.log("Fetched user data:", userData);

    document.getElementById("first-name").value = userData.first_name || "";
    document.getElementById("last-name").value = userData.surname || "";
    document.getElementById("email").value = userData.email || "";
    document.getElementById("phone").value = userData.phone || "";
    document.getElementById("street").value = userData.street || "";
    document.getElementById("house-no").value = userData.house_no || "";
    document.getElementById("town").value = userData.town || "";
    document.getElementById("city").value = userData.city || "";
    document.getElementById("county").value = userData.county || "";
  } catch (error) {
    console.error("Error loading user info:", error);
    alert("❌ Failed to load user info: " + error.message);
  }

  // Handle form submission to update user details
  accountForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const street = document.getElementById("street").value.trim();
    const houseNo = document.getElementById("house-no").value.trim();
    const town = document.getElementById("town").value.trim();
    const city = document.getElementById("city").value.trim();
    const county = document.getElementById("county").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();
    const confirmPassword = document
      .getElementById("confirm-password")
      .value.trim();

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !street || !houseNo) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      alert("⚠️ Passwords do not match.");
      return;
    }

    const userData = {
      first_name: firstName,
      surname: lastName,
      email,
      phone,
      street,
      house_no: houseNo,
      town,
      city,
      county,
    };

    // Only include password if provided
    if (newPassword) {
      userData.password = newPassword;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const responseBody = await response.json();
      if (!response.ok) {
        throw new Error(
          `Failed to update user: ${responseBody.error || response.statusText}`
        );
      }

      // Update username in localStorage if email changes
      if (email !== localStorage.getItem("username")) {
        localStorage.setItem("username", email);
      }

      // If password was changed, require re-login
      if (newPassword) {
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        alert(
          "✅ Account details updated successfully! Please log in with your new password."
        );
        window.location.href = "../login/login.html";
      } else {
        alert("✅ Account details updated successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("❌ Failed to update account details: " + error.message);
    }
  });
});
