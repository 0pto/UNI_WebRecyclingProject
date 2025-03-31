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
    console.log("Fetch user response status:", response.status); // Debugging
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to fetch user data: ${errorData.error || response.statusText}`
      );
    }
    const userData = await response.json();
    console.log("Fetched user data:", userData); // Debugging

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

    const userData = {
      first_name: document.getElementById("first-name").value.trim(),
      surname: document.getElementById("last-name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      street: document.getElementById("street").value.trim(),
      house_no: document.getElementById("house-no").value.trim(),
      town: document.getElementById("town").value.trim(),
      city: document.getElementById("city").value.trim(),
      county: document.getElementById("county").value.trim(),
    };

    try {
      console.log("Sending update request with data:", userData); // Debugging
      const response = await fetch(`${BACKEND_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      console.log("Update response status:", response.status); // Debugging
      console.log("Update response body:", await response.text()); // Debugging

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to update user: ${errorData.error || response.statusText}`
        );
      }

      const result = await response.json();
      console.log("Update successful:", result); // Debugging
      alert("✅ Account details updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("❌ Failed to update account details: " + error.message);
    }
  });
});
