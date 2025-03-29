document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.querySelector(".product-grid");

  // Updated product data with description and rating
  const products = [
    {
      id: 1,
      name: "Eco Water Bottle",
      price: 15.99,
      image: "../../Assets/Images/bottle.jpg",
      description:
        "A durable, stainless steel water bottle perfect for eco-friendly hydration.",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Reusable Bag",
      price: 5.99,
      image: "../../Assets/Images/bag.jpg",
      description: "A sturdy, washable bag made from recycled materials.",
      rating: 4.0,
    },
    {
      id: 3,
      name: "Bamboo Cutlery Set",
      price: 12.49,
      image: "../../Assets/Images/cutlery.jpg",
      description: "Sustainable bamboo utensils for on-the-go dining.",
      rating: 4.8,
    },
  ];

  // Render products
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
        <img src="${product.image}" alt="${
      product.name
    }" onerror="this.src='https://via.placeholder.com/150?text=${
      product.name
    }'">
        <h3>${product.name}</h3>
        <p class="rating">★ ${product.rating} / 5</p>
        <p class="description">${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button onclick="addToBasket(${product.id}, '${product.name}', ${
      product.price
    }, '${product.image}', '${product.description}', ${
      product.rating
    })">Add to Basket</button>
      `;
    productGrid.appendChild(productCard);
  });
});
