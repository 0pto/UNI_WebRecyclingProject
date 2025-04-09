

// navbar.js
document.addEventListener("DOMContentLoaded", () => {
  const allCookies = document.cookie;
  let userSessionObj = {};
  cookiesArray = allCookies.split(";");
  cookiesArray.forEach(cookie => {
    keyValueArray = cookie.split("=");
    newKey = keyValueArray[0].trim();
    newValue = keyValueArray[1];
    userSessionObj[newKey] = newValue;
  });
  // Generate navbar
  const navbarContainer = document.getElementById("navbar-container");
  const shopNavbarContainer = document.getElementById("shop-navbar-container")
  if (navbarContainer || shopNavbarContainer) {
    if (userSessionObj.RecycleNowJwt && userSessionObj.type === "false") {
      const navbarHTML = ` 
        <div class="nav-container">
          <a href="#" class="logo">RecycleNow</a>
          <ul class="nav-menu">
            <li class="nav-item"><a href="../index.html" class="nav-link">Home</a></li>
            <li class="nav-item">
                <a href="#" class="nav-link">How to Recycle</a>
            </li>
            <li class="nav-item">
              <a href="../dashboardUser/userDashboard.html" class="nav-link">My Dashboard</a>
            </li>
            <li class="nav-item"><a href="../IdeasPosts/IdeasPosts.html" class="nav-link">Ideas & Tips</a></li>
            <li class="nav-item">
              <a href="./Quotes/quote.html" class="nav-link">Get a quote</a>
            </li>
            <li class="nav-item"><a href="../Shop/shop.html" class="nav-link">Shop</a></li>
            <li class="nav-item">
              <a href="/UNI_WebRecyclingProject/html/tickets.html" class="nav-link">Review/Complains</a>
            </li>
          </ul>
          <button class="hamburger">☰</button>
          </div>`

      const shopNavbarHTML = `
          <div class="nav-container">
            <a href="#" class="logo">RecycleNow</a>
            <ul class="nav-menu">
              <li class="nav-item"><a href="../index.html" class="nav-link">Home</a></li>
              <li class="nav-item">
                  <a href="#" class="nav-link">How to Recycle</a>
              </li>
              <li class="nav-item">
                <a href="../dashboardUser/userDashboard.html" class="nav-link">My Dashboard</a>
              </li>
              <li class="nav-item"><a href="../IdeasPosts/IdeasPosts.html" class="nav-link">Ideas & Tips</a></li>
              <li class="nav-item">
                <a href="./Quotes/quote.html" class="nav-link">Get a quote</a>
              </li>
              <li class="nav-item"><a href="../Shop/shop.html" class="nav-link">Shop</a></li>
              <li class="nav-item">
                <a href="/UNI_WebRecyclingProject/html/shop/basket.html" class="nav-link">Basket <span id="basket-count">0</span></a>
              </li>
              <li class="nav-item">
                <a href="/UNI_WebRecyclingProject/html/shop/checkout.html" class="nav-link">Checkout</a>
              </li>
              <li class="nav-item">
                <a href="/UNI_WebRecyclingProject/html/tickets.html" class="nav-link">Review/Complains</a>
              </li>
            </ul>
            <button class="hamburger">☰</button>
          </div>
        `
      navbarContainer.innerHTML = navbarHTML;
      shopNavbarContainer.innerHTML = shopNavbarHTML;
    } else if (userSessionObj.RecycleNowJwt && userSessionObj.type === "true") {
      const navbarHTML = `
         <div class="nav-container">
            <a href="#" class="logo">RecycleNow</a>
            <ul class="nav-menu">
              <li class="nav-item"><a href="../index.html" class="nav-link">Home</a></li>
              <li class="nav-item">
                  <a href="#" class="nav-link">How to Recycle</a>
              </li>
              <li class="nav-item">
                <a href="../dashboardAdmin/adminDashboard.html" class="nav-link">My Dashboard</a>
              </li>
              <li class="nav-item">
                <a href="../IdeasPosts/IdeasPosts.html" class="nav-link">Ideas & Tips</a>
              </li>
            </ul>
            <button class="hamburger">☰</button>
        </div>
      `
      navbarContainer.innerHTML = navbarHTML;
    } else {
      const navbarHTML = `
        <nav class="navbar">
            <div class="nav-container">
                <a href="/UNI_WebRecyclingProject/html/index.html" class="logo">RecycleNow</a>
                <ul class="nav-menu">
                    <li class="nav-item"><a href="/UNI_WebRecyclingProject/html/index.html" class="nav-link">Home</a></li>
                    <li class="nav-item">
                      <a href="./Quotes/quote.html" class="nav-link">Get a quote</a>
                    </li>
                </ul>
                <button class="hamburger">☰</button>
            </div>
        </nav>
      `;
      navbarContainer.innerHTML = navbarHTML;
    }

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
