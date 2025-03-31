document.addEventListener("DOMContentLoaded", async () => {
  // Define the backend URL for API requests and images
  const BACKEND_URL = "http://localhost:3000";

  console.log("DOM loaded, fetching products...");
  const productList = document.getElementById("product-list");
  if (!productList) {
    console.error("Element with ID 'product-list' not found!");
    return;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/stock`);
    console.log("Fetch response status:", response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const products = await response.json();
    console.log("Fetched products:", products);

    if (products.length === 0) {
      productList.innerHTML = "<p>No products available.</p>";
      return;
    }

    products.forEach((product, index) => {
      console.log(`Rendering product ${index + 1}:`, product);
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      const imageUrl = product.image_url
        ? `${BACKEND_URL}${product.image_url}`
        : "https://via.placeholder.com/150?text=Product+Image";
      productCard.innerHTML = `
        <img src="${imageUrl}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description || "No description available."}</p>
        <p>Price: $${product.price.toFixed(2)}</p>
        <p>Stock: ${product.stock_quantity}</p>
        <button onclick="addToBasket(${product.id}, '${product.name}', ${
        product.price
      }, '${imageUrl}', '${product.description || ""}')">Add to Basket</button>
      `;
      productList.appendChild(productCard);
    });
    console.log("All products rendered.");
  } catch (error) {
    console.error("Error fetching products:", error);
    productList.innerHTML =
      "<p>Error loading products. Please try again later.</p>";
  }
});

// Add to basket function
function addToBasket(id, name, price, image_url, description) {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  const existingItem = basket.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    basket.push({
      id,
      name,
      price,
      image: image_url,
      description,
      quantity: 1,
    });
  }

  localStorage.setItem("basket", JSON.stringify(basket));
  updateBasketCount();
  // Removed alert(`${name} added to basket!`);
}

// Update basket count in the navbar
function updateBasketCount() {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const basketCount = document.getElementById("basket-count");
  if (basketCount) {
    basketCount.textContent = basket.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }
}
