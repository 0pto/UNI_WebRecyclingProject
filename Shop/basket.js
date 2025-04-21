async function loadBasket() {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const selectionContainer = document.getElementById("selection");
  const priceBreakdownContainer = document.getElementById("price-breakdown");
  let total = 0;

  // Fetch all products to get images
  let products = [];
  try {
    const response = await fetch("http://localhost:8000/api/products", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    products = await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    alert("Failed to load product images.");
  }

  // Display basket items with images
  selectionContainer.innerHTML = "";
  basket.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    const imageUrl = product ? `http://localhost:8000${product.ImageURL}` : "";
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    selectionContainer.innerHTML += `
          <div class="basket-item">
              <div class="flex items-center">
                  ${
                    imageUrl
                      ? `<img src="${imageUrl}" alt="${item.name}" class="basket-img mr-4">`
                      : ""
                  }
                  <div>
                      <h3 class="text-lg font-semibold">${item.name}</h3>
                      <p class="text-gray-600">£${item.price.toFixed(2)} x ${
      item.quantity
    }</p>
                  </div>
              </div>
              <div class="flex items-center">
                  <button class="bg-gray-300 px-2 py-1 rounded" onclick="updateQuantity(${
                    item.id
                  }, ${item.quantity - 1})">-</button>
                  <span class="mx-2">${item.quantity}</span>
                  <button class="bg-gray-300 px-2 py-1 rounded" onclick="updateQuantity(${
                    item.id
                  }, ${item.quantity + 1})">+</button>
                  <button class="ml-4 text-red-600" onclick="removeItem(${
                    item.id
                  })">Remove</button>
              </div>
          </div>
      `;
  });

  // Display price breakdown
  priceBreakdownContainer.innerHTML = `
      <h3 class="text-lg font-semibold mb-2">Price Breakdown</h3>
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
          <span>£${total.toFixed(2)}</span>
      </div>
  `;
  document.getElementById("basket-total").textContent = `£${total.toFixed(2)}`;
  updateBasketCount();
}

function updateQuantity(itemId, newQuantity) {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  const item = basket.find((item) => item.id === itemId);
  if (item) {
    if (newQuantity <= 0) {
      basket = basket.filter((item) => item.id !== itemId);
    } else {
      item.quantity = newQuantity;
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    loadBasket();
  }
}

function removeItem(itemId) {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  basket = basket.filter((item) => item.id !== itemId);
  localStorage.setItem("basket", JSON.stringify(basket));
  loadBasket();
}

function updateBasketCount() {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
  const basketCountElement = document.getElementById("basket-count");
  if (basketCountElement) {
    basketCountElement.textContent = totalItems;
  }
}

function proceedToCheckout() {
  const allCookies = document.cookie;
  let userSessionObj = {};
  cookiesArray = allCookies.split(";");
  cookiesArray.forEach((cookie) => {
    keyValueArray = cookie.split("=");
    newKey = keyValueArray[0].trim();
    newValue = keyValueArray[1];
    userSessionObj[newKey] = newValue;
  });

  if (userSessionObj.RecycleNowJwt) {
    window.location.href = "/UNI_WebRecyclingProject/Shop/checkout.html";
  } else {
    alert("Please log in to proceed to checkout.");
    window.location.href = "/UNI_WebRecyclingProject/Login/login.html";
  }
}

document.addEventListener("DOMContentLoaded", loadBasket);
