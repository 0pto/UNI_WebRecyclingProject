document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar-container");
  const BACKEND_URL = "http://localhost:3000";

  const isLoggedIn = localStorage.getItem("userId") !== null;
  const username = localStorage.getItem("username") || "Guest";
  const isAdmin = sessionStorage.getItem("isAdmin") === "1";

  if (navbarContainer) {
    const navbarHTML = `
      <nav class="navbar">
        <div class="nav-container">
          <div class="user-info">
            ${
              isLoggedIn
                ? `
                  <a href="/UNI_WebRecyclingProject/html/account/account.html" class="username-link">
                    <img src="${BACKEND_URL}/images/Useraccount.png" alt="User Account" height="24" />
                    <span class="username">${username}</span>
                  </a>
                `
                : ""
            }
          </div>
          <a href="/UNI_WebRecyclingProject/html/index.html" class="logo">
            <div class="logo-container">
              <img src="${BACKEND_URL}/images/PNG_256/recycle-ecology-trash-bin-sign.png" alt="RecycleNow Logo" height="40" />
              <span class="logo-text">Recycle-Now</span>
            </div>
          </a>
          <ul class="nav-menu">
            <li class="nav-item"><a href="/UNI_WebRecyclingProject/html/shop/shop.html" class="nav-link">Shop</a></li>
            <li class="nav-item"><a href="/UNI_WebRecyclingProject/html/Quotes/quote.html" class="nav-link">Get A Quote</a></li>
            <li class="nav-item"><a href="/UNI_WebRecyclingProject/html/Complains/tickets.html" class="nav-link">Ticket</a></li>
            <li class="nav-item"><a href="/UNI_WebRecyclingProject/html/IdeasPosts/IdeasPosts.html" class="nav-link">Ideas & Tips</a></li>
            ${
              isLoggedIn
                ? `
                  <li class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle">Dashboard</a>
                    <ul class="dropdown-menu">
                      ${
                        isAdmin
                          ? `<li><a href="/UNI_WebRecyclingProject/html/dashboard/adminDashboard.html" class="nav-link">Admin Dashboard</a></li>`
                          : `<li><a href="/UNI_WebRecyclingProject/html/dashboard/userDashboard.html" class="nav-link">User Dashboard</a></li>`
                      }
                    </ul>
                  </li>
                `
                : ""
            }
            <li class="nav-item"><a href="#" id="auth-nav-button" class="nav-link">${
              isLoggedIn ? "Log Out" : "Login"
            }</a></li>
            <li class="nav-item basket-icon">
              <a href="/UNI_WebRecyclingProject/html/shop/basket.html" class="nav-link">
                <img src="${BACKEND_URL}/images/PNG_256/box-product-recycle-ecology-delivery.png" alt="Basket" height="30" />
                <span id="basket-count">0</span>
              </a>
            </li>
          </ul>
          <button class="hamburger">☰</button>
        </div>
      </nav>
    `;

    navbarContainer.innerHTML = navbarHTML;

    // Handle login/logout button
    document
      .getElementById("auth-nav-button")
      .addEventListener("click", (e) => {
        e.preventDefault();
        if (isLoggedIn) {
          localStorage.removeItem("userId");
          localStorage.removeItem("username");
          sessionStorage.removeItem("isAdmin");
          alert("👋 Logged out successfully!");
          window.location.reload();
        } else {
          window.location.href =
            "/UNI_WebRecyclingProject/html/login/login.html";
        }
      });

    // Update basket count
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
        );
      });

      const navLinks = document.querySelectorAll(".nav-link");
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("active");
          console.log("Nav link clicked, menu closed");
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
  }
});
