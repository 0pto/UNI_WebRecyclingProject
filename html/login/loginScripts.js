document.addEventListener("DOMContentLoaded", () => {
  const BACKEND_URL = "http://localhost:3000";
  const loginForm = document.getElementById("login");

  if (!loginForm) return;

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const user = await response.json();
      localStorage.setItem("userId", user.id);
      localStorage.setItem("username", user.username || email); // Store username

      alert(`✅ Welcome, ${user.username || email}! Login successful.`);
      window.location.href = "../index.html"; // Redirect
    } catch (error) {
      alert("❌ Login failed! " + error.message);
    }
  });
});
