// navbar.js
document.addEventListener("DOMContentLoaded", () => {
  // Generate navbar
  const navbarContainer = document.getElementById("navbar-container");

  if (navbarContainer) {
    const navbarHTML = `
          <nav class="navbar">
              <div class="nav-container">
                  <a href="/UNI_WebRecyclingProject/html/index.html" class="logo">RecycleNow</a>
                  <ul class="nav-menu">
                      <li class="nav-item"><a href="/UNI_WebRecyclingProject/html/index.html" class="nav-link">Home</a></li>
                      <li class="nav-item"><a href="/UNI_WebRecyclingProject/html/tickets.html" class="nav-link">Make a Ticket</a></li>
                      <li class="nav-item"><a href="/UNI_WebRecyclingProject/html/shop/shop.html" class="nav-link">Shop</a></li>
                      <li class="nav-item"><a href="/UNI_WebRecyclingProject/html/shop/basket.html" class="nav-link">Basket <span id="basket-count">0</span></a></li>
                      <li class="nav-item"><a href="/UNI_WebRecyclingProject/html/shop/checkout.html" class="nav-link">Checkout</a></li>
                  </ul>
                  <button class="hamburger">☰</button>
              </div>
          </nav>
      `;
    navbarContainer.innerHTML = navbarHTML;
  }

  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      console.log(
        "Hamburger clicked, menu active:",
        navMenu.classList.contains("active")
      ); // Debugging
    });

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        console.log("Nav link clicked, menu closed"); // Debugging
      });
    });
  }
});
