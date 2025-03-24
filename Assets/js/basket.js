// Basket state
let basket = JSON.parse(localStorage.getItem("basket")) || [];

// Add item to basket with all details
function addToBasket(id, name, price, image, description, rating) {
  const item = basket.find((i) => i.id === id);
  if (item) {
    item.quantity += 1;
  } else {
    basket.push({ id, name, price, image, description, rating, quantity: 1 });
  }
  updateBasket();
}

// Remove item from basket entirely
function removeFromBasket(id) {
  basket = basket.filter((i) => i.id !== id);
  updateBasket();
}

// Adjust quantity by 1 (add or remove)
function adjustQuantity(id, change) {
  const item = basket.find((i) => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromBasket(id); // Remove if quantity drops to 0
    } else {
      updateBasket();
    }
  }
}

// Update basket UI and storage
function updateBasket() {
  localStorage.setItem("basket", JSON.stringify(basket));
  const basketCount = document.getElementById("basket-count");
  if (basketCount) {
    basketCount.textContent = basket.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }

  const basketItems = document.querySelector(".basket-items");
  const breakdownItems = document.querySelector(".breakdown-items");
  const basketSubtotal = document.getElementById("basket-subtotal");
  const basketShipping = document.getElementById("basket-shipping");
  const basketTotal = document.getElementById("basket-total");

  if (
    basketItems &&
    breakdownItems &&
    basketSubtotal &&
    basketShipping &&
    basketTotal
  ) {
    basketItems.innerHTML = "";
    breakdownItems.innerHTML = "";
    let subtotal = 0;

    basket.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      // Render basket item
      const basketItem = document.createElement("div");
      basketItem.classList.add("basket-item");
      basketItem.innerHTML = `
        <img src="${item.image}" alt="${
        item.name
      }" onerror="this.src='https://via.placeholder.com/100?text=${item.name}'">
        <div class="details">
          <h3>${item.name}</h3>
          <p class="rating">★ ${item.rating} / 5</p>
          <p class="description">${item.description}</p>
          <p class="price">$${itemTotal.toFixed(2)} (${
        item.quantity
      } x $${item.price.toFixed(2)})</p>
        </div>
        <div class="quantity-controls">
          <button onclick="adjustQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="adjustQuantity(${item.id}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromBasket(${
          item.id
        })">Remove All</button>
      `;
      basketItems.appendChild(basketItem);

      // Add to price breakdown
      const breakdownItem = document.createElement("div");
      breakdownItem.classList.add("breakdown-item");
      breakdownItem.innerHTML = `
        <span>${item.name} (x${item.quantity})</span>
        <span>$${itemTotal.toFixed(2)}</span>
      `;
      breakdownItems.appendChild(breakdownItem);
    });

    const shipping = 5.0; // Static shipping cost
    basketSubtotal.textContent = subtotal.toFixed(2);
    basketShipping.textContent = shipping.toFixed(2);
    basketTotal.textContent = (subtotal + shipping).toFixed(2);
  }

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
  }
}

// Initialize basket on page load
document.addEventListener("DOMContentLoaded", updateBasket);
