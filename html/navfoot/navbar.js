document.addEventListener("DOMContentLoaded", () => {
  // Generate navbar
  const navbarContainer = document.getElementById("navbar-container");

  if (navbarContainer) {
    const navbarHTML = `
      <nav class="navbar">
        <div class="nav-container">
          <a href="/UNI_WebRecyclingProject/html/index.html" class="logo">
            <img src="/UNI_WebRecyclingProject/Assets/Images/logo.png" alt="RecycleNow Logo" height="40" />
          </a>
          <ul class="nav-menu">
            <li class="nav-item"><a href="/UNI_WebRecyclingProject/html/shop/shop.html" class="nav-link">Shop</a></li>
            <li class="nav-item"><a href="/UNI_WebRecyclingProject/html/Quotes/quote.html" class="nav-link">Get A Quote</a></li>
            <li class="nav-item"><a href="/UNI_WebRecyclingProject/html/Complains/tickets.html" class="nav-link">Ticket</a></li>
            <li class="nav-item"><a href="/UNI_WebRecyclingProject/html/IdeasPosts/IdeasPosts.html" class="nav-link">Ideas & Tips</a></li>
            <li class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle">Dashboard</a>
              <ul class="dropdown-menu">
                <li><a href="/UNI_WebRecyclingProject/html/dashboard/userDashboard.html" class="nav-link">User Dashboard</a></li>
                <li><a href="/UNI_WebRecyclingProject/html/dashboard/adminDashboard.html" class="nav-link">Admin Dashboard</a></li>
              </ul>
            </li>
            <li class="nav-item"><a href="/UNI_WebRecyclingProject/html/login/login.html" class="nav-link">Login/Register</a></li>
            <li class="nav-item basket-icon">
              <a href="/UNI_WebRecyclingProject/html/shop/basket.html" class="nav-link">
                <img src="/UNI_WebRecyclingProject/Assets/Images/basket-icon.png" alt="Basket" height="30" />
                <span id="basket-count">0</span>
              </a>
            </li>
          </ul>
          <button class="hamburger">☰</button>
        </div>
      </nav>
    `;
    navbarContainer.innerHTML = navbarHTML;
  }

  // Update basket count (assuming basket.js handles this)
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const basketCount = document.getElementById("basket-count");
  if (basketCount) {
    basketCount.textContent = basket.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
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

  // Dropdown toggle functionality
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener("click", (e) => {
      e.preventDefault();
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });
  }
});
