async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:8000/api/products", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const products = await response.json();
    const selectionContainer = document.getElementById("selection");
    selectionContainer.innerHTML = "";
    products.forEach((product) => {
      const imageUrl = `http://localhost:8000${product.ImageURL}`;
      selectionContainer.innerHTML += `
              <div class="product-card">
                  <img src="${imageUrl}" alt="${
        product.productName
      }" class="product-img">
                  <h3 class="text-lg font-semibold mt-2">${
                    product.productName
                  }</h3>
                  <p class="text-gray-600">${product.description}</p>
                  <p class="text-green-600 font-bold mt-2">£${product.price.toFixed(
                    2
                  )}</p>
                  <p class="text-gray-500">In Stock: ${
                    product.stockQuantity
                  }</p>
                  <button class="submit-button mt-4" onclick="addToBasket(${
                    product.id
                  }, '${product.productName}', ${
        product.price
      })">Add to Basket</button>
              </div>
          `;
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    alert("Failed to load products. Please try again later.");
  }
}

function addToBasket(productId, productName, price) {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  const existingItem = basket.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    basket.push({
      id: productId,
      name: productName,
      price: price,
      quantity: 1,
    });
  }
  localStorage.setItem("basket", JSON.stringify(basket));
  updateBasketCount();
}

function updateBasketCount() {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
  const basketCountElement = document.getElementById("basket-count");
  if (basketCountElement) {
    basketCountElement.textContent = totalItems;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
  updateBasketCount();
});
