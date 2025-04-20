

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

  /* Generate navbar : links to some page are sending to home page now because the page is not done yet.*/

  //Check the nav element unique id and the users session value and render the navbar accordingly. 
  const navbarElement = document.querySelector("nav")
  const navbarElementId = navbarElement.id;

  const navbarContainer = document.getElementById("navbar-container");
  const HomeNavbarContainer = document.getElementById("navbar-container-home");

  if (userSessionObj.RecycleNowJwt && userSessionObj.type === "false") {  //Navigation menu for non admin

    if (navbarElementId.trim() === "navbar-container-home") {
      const homeNavbarHTML = `
      <div class="nav-container">
          <a href="#" class="logo">RecycleNow</a>
          <ul class="nav-menu">
            <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
            <li class="nav-item">
                <a href="#" class="nav-link">How to Recycle</a>
            </li>
            <li class="nav-item">
              <a href="./dashboardUser/userDashboard.html" class="nav-link">My Dashboard</a>
            </li>
            <li class="nav-item"><a href="./IdeasPosts/IdeasPosts.html" class="nav-link">Ideas&Tips</a></li>
            <li class="nav-item">
              <a href="../Quotes/quote.html" class="nav-link">Get a quote</a>
            </li>
            <li class="nav-item"><a href="./Shop/shop.html" class="nav-link">Shop</a></li>
            <li class="nav-item">
              <a href="./Complains/tickets.html" class="nav-link">Complains</a>
            </li>
          </ul>
          <button class="hamburger">☰</button>
          </div>
      `
      navbarElement.innerHTML = homeNavbarHTML;
    } else if (navbarElementId.trim() === "navbar-container") {
      const otherNavbarHTML = ` 
      <div class="nav-container">
        <a href="#" class="logo">RecycleNow</a>
        <ul class="nav-menu">
          <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
          <li class="nav-item">
              <a href="#" class="nav-link">How to Recycle</a>
          </li>
          <li class="nav-item">
            <a href="../dashboardUser/userDashboard.html" class="nav-link">My Dashboard</a>
          </li>
          <li class="nav-item"><a href="../IdeasPosts/IdeasPosts.html" class="nav-link">Ideas&Tips</a></li>
          <li class="nav-item">
            <a href="../Quotes/quote.html" class="nav-link">Get a quote</a>
          </li>
          <li class="nav-item"><a href="../Shop/shop.html" class="nav-link">Shop</a></li>
          <li class="nav-item">
            <a href="../Complains/tickets.html" class="nav-link">Complains</a>
          </li>
        </ul>
        <button class="hamburger">☰</button>
        </div>`;
      navbarElement.innerHTML = otherNavbarHTML;
    } else if (navbarElementId.trim() === "shop-navbar-container") {
      const shopNavbarHTML = `
        <div class="nav-container">
          <a href="#" class="logo">RecycleNow</a>
          <ul class="nav-menu">
            <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
            <li class="nav-item">
                <a href="#" class="nav-link">How to Recycle</a>
            </li>
            <li class="nav-item">
              <a href="../dashboardUser/userDashboard.html" class="nav-link">My Dashboard</a>
            </li>
            <li class="nav-item"><a href="../IdeasPosts/IdeasPosts.html" class="nav-link">Ideas & Tips</a></li>
            <li class="nav-item">
              <a href="../Quotes/quote.html" class="nav-link">Get a quote</a>
            </li>
            <li class="nav-item"><a href="../Shop/shop.html" class="nav-link">Shop</a></li>
            <li class="nav-item">
              <a href="./basket.html" class="nav-link">Basket <span id="basket-count">0</span></a>
            </li>
            <li class="nav-item">
              <a href="./checkout.html" class="nav-link">Checkout</a>
            </li>
            <li class="nav-item">
              <a href="../Complains/tickets.html" class="nav-link">Complains</a>
            </li>
          </ul>
          <button class="hamburger">☰</button>
        </div>
      `;
      navbarElement.innerHTML = shopNavbarHTML;
    }

  } else if (userSessionObj.RecycleNowJwt && userSessionObj.type === "true") { //Navigation menu for admin
    if (navbarElementId.trim() === "navbar-container-home") {
      const homeNavbarHTML = `
      <div class="nav-container">
        <a href="#" class="logo">RecycleNow</a>
        <ul class="nav-menu">
          <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
          <li class="nav-item">
              <a href="#" class="nav-link">How to Recycle</a>
          </li>
          <li class="nav-item">
            <a href="./dashboardAdmin/adminDashboard.html" class="nav-link">My Dashboard</a>
          </li>
          <li class="nav-item">
            <a href="./IdeasPosts/IdeasPosts.html" class="nav-link">Ideas & Tips</a>
          </li>
        </ul>
        <button class="hamburger">☰</button>
    </div>
  `;
      navbarElement.innerHTML = homeNavbarHTML;
    } else if (navbarElementId.trim() === "navbar-container") {
      const otherNavbarHTML = `
    <div class="nav-container">
          <a href="#" class="logo">RecycleNow</a>
          <ul class="nav-menu">
            <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
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
    `;
      navbarElement.innerHTML = otherNavbarHTML;
    } else {
      const shopNavbarHTML = `
         
      `;
      navbarElement.innerHTML = shopNavbarHTML;
    }

  } else {

    if (navbarElementId.trim() === "navbar-container-home") {
      const homeNavbarHTML = `
        <div class="nav-container">
              <a href="/UNI_WebRecyclingProject/html/index.html" class="logo">RecycleNow</a>
              <ul class="nav-menu">
                  <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
                    <li class="nav-item"><a href="./Shop/shop.html" class="nav-link">Shop</a></li>
                  <li class="nav-item">
                    <a href="../Quotes/quote.html" class="nav-link">Get a quote</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-link">How to Recycle</a>
                  </li>
              </ul>
              <button class="hamburger">☰</button>
          </div> 
        `;
      navbarElement.innerHTML = homeNavbarHTML;
    } else if (navbarElementId.trim() === "navbar-container") {
      const otherNavbarHTML = ` 
        <div class="nav-container">
          <a href="/UNI_WebRecyclingProject/html/index.html" class="logo">RecycleNow</a>
          <ul class="nav-menu">
              <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
                <li class="nav-item"><a href="../Shop/shop.html" class="nav-link">Shop</a></li>
              <li class="nav-item"><a href="../Quotes/quote.html" class="nav-link">Get a quote</a></li>
              <li class="nav-item">
                <a href="#" class="nav-link">How to Recycle</a>
              </li>
          </ul>
          <button class="hamburger">☰</button>
        </div> 
      `;
      navbarElement.innerHTML = otherNavbarHTML;
    } else if (navbarElementId.trim() === "shop-navbar-container") {
      const shopNavbarHTML = `
        <div class="nav-container">
          <a href="#" class="logo">RecycleNow</a>
          <ul class="nav-menu">
            <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
            <li class="nav-item">
                <a href="#" class="nav-link">How to Recycle</a>
            </li>
            <li class="nav-item">
              <a href="../dashboardUser/userDashboard.html" class="nav-link">My Dashboard</a>
            </li>
            <li class="nav-item"><a href="../IdeasPosts/IdeasPosts.html" class="nav-link">Ideas & Tips</a></li>
            <li class="nav-item">
              <a href="../Quotes/quote.html" class="nav-link">Get a quote</a>
            </li>
            <li class="nav-item"><a href="../Shop/shop.html" class="nav-link">Shop</a></li>
            <li class="nav-item">
              <a href="./basket.html" class="nav-link">Basket <span id="basket-count">0</span></a>
            </li>
            <li class="nav-item">
              <a href="./checkout.html" class="nav-link">Checkout</a>
            </li>
            <li class="nav-item">
              <a href="../Complains/tickets.html" class="nav-link">Complains</a>
            </li>
          </ul>
          <button class="hamburger">☰</button>
        </div>
      `;
      navbarElement.innerHTML = shopNavbarHTML;
    }

    HomeNavbarContainer.innerHTML = homeNavbarHTML;
    navbarContainer.innerHTML = otherNavbarHTML;
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
