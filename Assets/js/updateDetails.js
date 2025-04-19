//Functions to handle the update of users details.

const updateForm = document.getElementById("updateDetails");
const toggleFormButton = document.getElementById("toggle-update-form");

// Toggle the update form visibility for account details
toggleFormButton.addEventListener("click", () => {
    updateForm.style.display =
        updateForm.style.display === "none" ? "block" : "none";
});

// Handle form submission to update user details
updateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const street = document.getElementById("address").value.trim();
    const houseNo = document.getElementById("postcode").value.trim();
    const username = document.getElementById("username").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();
    const confirmPassword = document
        .getElementById("confirm-password")
        .value.trim();

    // Basic validation
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !street ||
        !houseNo ||
        !username
    ) {
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
        town: "",
        city: "",
        county: "",
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

        // Update username in localStorage if changed
        if (username !== localStorage.getItem("username")) {
            localStorage.setItem("username", username);
        }

        alert("✅ Account details updated successfully!");
        window.location.reload();
    } catch (error) {
        console.error("Error updating user:", error);
        alert("❌ Failed to update account details: " + error.message);
    }
});