document.addEventListener("DOMContentLoaded", async () => {
  const BACKEND_URL = "http://localhost:3000";
  const summaryItems = document.querySelector(".summary-items");
  const checkoutTotal = document.getElementById("checkout-total");
  const checkoutForm = document.getElementById("checkout-form");
  const userInfoContainer = document.getElementById("user-info");

  const userId = localStorage.getItem("userId");
  if (!userId) {
    window.location.href = "../login/login.html";
    return;
  }

  try {
    const userResponse = await fetch(`${BACKEND_URL}/api/users/${userId}`);
    if (!userResponse.ok) throw new Error("Failed to fetch user data");
    const userData = await userResponse.json();

    userInfoContainer.innerHTML = `
      <p><strong>Name:</strong> ${userData.first_name} ${userData.surname}</p>
      <p><strong>Address:</strong> ${userData.street} ${userData.house_no}, ${userData.town}, ${userData.city}, ${userData.county}</p>
      <p><strong>Email:</strong> ${userData.email}</p>
    `;
  } catch (error) {
    console.error("Error loading user info:", error);
  }

  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  let total = 0;
  basket.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const summaryItem = document.createElement("div");
    summaryItem.classList.add("summary-item");
    summaryItem.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>$${itemTotal.toFixed(2)}</span>
    `;
    summaryItems.appendChild(summaryItem);
  });
  checkoutTotal.textContent = (total + 5.0).toFixed(2);

  // Format input helpers
  const cardNumberInput = document.getElementById("card-number");
  const expDateInput = document.getElementById("exp-date");

  // Format card number as 1234 5678 9012 3456
  cardNumberInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    value = value.slice(0, 16); // Limit to 16 digits
    e.target.value = value.replace(/(\d{4})/g, "$1 ").trim();
  });

  // Format expiration date as MM/YY
  expDateInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    value = value.slice(0, 4); // Limit to 4 digits
    if (value.length > 2) {
      e.target.value = `${value.slice(0, 2)}/${value.slice(2)}`;
    } else {
      e.target.value = value;
    }
  });

  checkoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cardNumber = document
      .getElementById("card-number")
      .value.replace(/\s/g, "");
    const secCode = document.getElementById("sec-code").value;
    const expDate = document.getElementById("exp-date").value;
    const cardHolder = document.getElementById("card-holder").value;

    // Validate payment information only
    const isCardNumberValid = /^\d{16}$/.test(cardNumber);
    const isSecCodeValid = /^\d{3,4}$/.test(secCode);
    const isExpDateValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expDate);
    const isCardHolderValid = cardHolder.trim().length > 0;

    if (
      isCardNumberValid &&
      isSecCodeValid &&
      isExpDateValid &&
      isCardHolderValid
    ) {
      const items = basket.map((item) => ({
        stock_id: item.id,
        quantity: item.quantity,
      }));
      try {
        const response = await fetch(`${BACKEND_URL}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: parseInt(userId), items }),
        });
        if (!response.ok) throw new Error("Failed to place order");
        localStorage.removeItem("basket");
        window.location.href = "../index.html";
      } catch (error) {
        console.error("Error placing order:", error);
      }
    } else {
      console.log(
        "Validation failed:\n" +
          (!isCardNumberValid ? "- Card number must be 16 digits\n" : "") +
          (!isSecCodeValid ? "- Security code must be 3 or 4 digits\n" : "") +
          (!isExpDateValid ? "- Expiration date must be MM/YY\n" : "") +
          (!isCardHolderValid ? "- Name on card is required\n" : "")
      );
    }
  });
});
