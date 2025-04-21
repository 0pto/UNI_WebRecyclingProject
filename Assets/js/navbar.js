document.addEventListener("DOMContentLoaded", () => {
  const allCookies = document.cookie;
  let userSessionObj = {};
  cookiesArray = allCookies.split(";");
  cookiesArray.forEach((cookie) => {
    keyValueArray = cookie.split("=");
    newKey = keyValueArray[0].trim();
    newValue = keyValueArray[1];
    userSessionObj[newKey] = newValue;
  });

  const navbarElement = document.querySelector("nav");
  const navbarElementId = navbarElement.id;

  const root = "/UNI_WebRecyclingProject";
  const homePath = `${root}/index.html`;

  if (userSessionObj.RecycleNowJwt && userSessionObj.type === "false") {
    const commonLinks = `
      <li class="nav-item"><a href="${homePath}" class="nav-link">Home</a></li>
      <li class="nav-item"><a href="#" class="nav-link">How to Recycle</a></li>
      <li class="nav-item"><a href="${root}/dashboardUser/userDashboard.html" class="nav-link">My Dashboard</a></li>
      <li class="nav-item"><a href="${root}/IdeasPosts/IdeasPosts.html" class="nav-link">Ideas & Tips</a></li>
      <li class="nav-item"><a href="${root}/Quotes/quote.html" class="nav-link">Get a quote</a></li>
      <li class="nav-item"><a href="${root}/Shop/shop.html" class="nav-link">Shop</a></li>
      <li class="nav-item"><a href="${root}/Shop/basket.html" class="nav-link">Basket <span id="basket-count">0</span></a></li>
      <li class="nav-item"><a href="${root}/Shop/checkout.html" class="nav-link">Checkout</a></li>
      <li class="nav-item"><a href="${root}/Complains/tickets.html" class="nav-link">Complains</a></li>
    `;

    navbarElement.innerHTML = `
      <div class="nav-container">
        <a href="${homePath}" class="logo">RecycleNow</a>
        <ul class="nav-menu">
          ${commonLinks}
        </ul>
        <button class="hamburger">☰</button>
      </div>
    `;
  } else if (userSessionObj.RecycleNowJwt && userSessionObj.type === "true") {
    const adminLinks = `
      <li class="nav-item"><a href="${homePath}" class="nav-link">Home</a></li>
      <li class="nav-item"><a href="#" class="nav-link">How to Recycle</a></li>
      <li class="nav-item"><a href="${root}/dashboardAdmin/adminDashboard.html" class="nav-link">My Dashboard</a></li>
      <li class="nav-item"><a href="${root}/IdeasPosts/IdeasPosts.html" class="nav-link">Ideas & Tips</a></li>
      <li class="nav-item"><a href="${root}/Shop/shop.html" class="nav-link">Shop</a></li>
      <li class="nav-item"><a href="${root}/Shop/basket.html" class="nav-link">Basket <span id="basket-count">0</span></a></li>
    `;

    navbarElement.innerHTML = `
      <div class="nav-container">
        <a href="${homePath}" class="logo">RecycleNow</a>
        <ul class="nav-menu">
          ${adminLinks}
        </ul>
        <button class="hamburger">☰</button>
      </div>
    `;
  } else {
    const guestLinks = `
      <li class="nav-item"><a href="${homePath}" class="nav-link">Home</a></li>
      <li class="nav-item"><a href="${root}/Shop/shop.html" class="nav-link">Shop</a></li>
      <li class="nav-item"><a href="${root}/Shop/basket.html" class="nav-link">Basket <span id="basket-count">0</span></a></li>
      <li class="nav-item"><a href="${root}/Quotes/quote.html" class="nav-link">Get a quote</a></li>
      <li class="nav-item"><a href="#" class="nav-link">How to Recycle</a></li>
      <li class="nav-item"><a href="${root}/Login/login.html" class="nav-link">Login</a></li>
    `;

    navbarElement.innerHTML = `
      <div class="nav-container">
        <a href="${homePath}" class="logo">RecycleNow</a>
        <ul class="nav-menu">
          ${guestLinks}
        </ul>
        <button class="hamburger">☰</button>
      </div>
    `;
  }

  // Update basket count on load
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
  const basketCountElement = document.getElementById("basket-count");
  if (basketCountElement) {
    basketCountElement.textContent = totalItems;
  }

  // Hamburger toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }
});
