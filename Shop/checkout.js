async function loadCheckout() {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const priceBreakdownContainer = document.getElementById("price-breakdown");
  let total = 0;

  // Populate user details from cookies
  const allCookies = document.cookie;
  let userSessionObj = {};
  cookiesArray = allCookies.split(";");
  cookiesArray.forEach((cookie) => {
    keyValueArray = cookie.split("=");
    newKey = keyValueArray[0].trim();
    newValue = keyValueArray[1];
    userSessionObj[newKey] = newValue;
  });

  if (!userSessionObj.RecycleNowJwt) {
    alert("Please log in to proceed.");
    window.location.href = "/UNI_WebRecyclingProject/Login/login.html";
    return;
  }

  // Fetch user details
  let user = {};
  try {
    const response = await fetch(
      `http://localhost:8000/user/getUser/${userSessionObj.userId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user: " + response.statusText);
    }
    user = await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    alert("Failed to load user details.");
    return;
  }

  document.getElementById("first-name").value = user.first_name || "";
  document.getElementById("surname").value = user.surname || "";
  document.getElementById("address").value = user.address || "";
  document.getElementById("postcode").value = user.postcode || "";
  document.getElementById("phone").value = user.phone || "";

  // Display price breakdown
  priceBreakdownContainer.innerHTML = `
      <h3 class="text-lg font-semibold mb-2">Order Summary</h3>
      ${basket
        .map(
          (item) => `
          <div class="flex justify-between mb-1">
              <span>${item.name} x ${item.quantity}</span>
              <span>£${(item.price * item.quantity).toFixed(2)}</span>
          </div>
      `
        )
        .join("")}
      <div class="flex justify-between font-bold mt-2 pt-2 border-t">
          <span>Total</span>
          <span>£${basket
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toFixed(2)}</span>
      </div>
  `;
}

async function placeOrder() {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  if (basket.length === 0) {
    alert("Your basket is empty.");
    return;
  }

  // Validate shipping details
  const address = document.getElementById("address").value.trim();
  const postcode = document.getElementById("postcode").value.trim();
  const phone = document.getElementById("phone").value.trim();
  if (!address || !postcode || !phone) {
    alert("Please fill in all shipping details.");
    return;
  }

  // Validate bank details
  const cardNumber = document.getElementById("card-number").value.trim();
  const expiryDate = document.getElementById("expiry-date").value.trim();
  const cvv = document.getElementById("cvv").value.trim();
  if (!cardNumber || !expiryDate || !cvv) {
    alert("Please fill in all bank details.");
    return;
  }

  // Basic format validation
  const cardNumberRegex = /^\d{16}$/;
  const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const cvvRegex = /^\d{3}$/;
  if (!cardNumberRegex.test(cardNumber.replace(/\s/g, ""))) {
    alert("Please enter a valid 16-digit card number.");
    return;
  }
  if (!expiryDateRegex.test(expiryDate)) {
    alert("Please enter a valid expiry date in MM/YY format.");
    return;
  }
  if (!cvvRegex.test(cvv)) {
    alert("Please enter a valid 3-digit CVV.");
    return;
  }

  const allCookies = document.cookie;
  let userSessionObj = {};
  cookiesArray = allCookies.split(";");
  cookiesArray.forEach((cookie) => {
    keyValueArray = cookie.split("=");
    newKey = keyValueArray[0].trim();
    newValue = keyValueArray[1];
    userSessionObj[newKey] = newValue;
  });

  const userId = userSessionObj.userId;
  const totalAmount = basket
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);
  const orderData = {
    userID: userId,
    totalAmount: totalAmount,
    status: "Pending",
    createdAt: new Date().toISOString().split("T")[0],
    items: basket,
  };

  try {
    const response = await fetch("http://localhost:8000/api/orders", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    const result = await response.json();
    if (response.ok) {
      alert("Order placed successfully!");
      localStorage.removeItem("basket");
      window.location.href = "/UNI_WebRecyclingProject/Shop/shop.html";
    } else {
      alert("Failed to place order: " + result.error);
    }
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Failed to place order. Please try again.");
  }
}

document.addEventListener("DOMContentLoaded", loadCheckout);
