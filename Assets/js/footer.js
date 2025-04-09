// Conditionally render footer content 
document.addEventListener("DOMContentLoaded", () => {
  // get cookies and save user's session "userSessionObj"
  const allCookies = document.cookie;
  let userSessionObj = {};
  cookiesArray = allCookies.split(";");
  cookiesArray.forEach(cookie => {
    keyValueArray = cookie.split("=");
    newKey = keyValueArray[0].trim();
    newValue = keyValueArray[1];
    userSessionObj[newKey] = newValue;
  });
  const footerContainer = document.getElementById("footer-container");

  if (footerContainer && userSessionObj.RecycleNowJwt) {
    // Determine the base path based on the current page's location
    const pathPrefix = window.location.pathname.includes("/shop/")
      ? "../../Assets/Images/"
      : "../Assets/Images/";

    const footerHTML = `<div class="sb_footer-links">
      <div class="sb_footer-links-div">
        <h4>Contact</h4>
        <a href="/Employer">
          <p>Phone</p>
        </a>
        <a href="/Random">
          <p>email</p>
        </a>
        <a href="/Random2">
          <p>Address</p>
        </a>
      </div>

      <div class="sb_footer-links-div">
        <h4>RecycleNow</h4>
        <a href="/Random">
          <p>About</p>
        </a>
        <a href="/Random">
          <p>Terms & Conditions</p>
        </a>
      </div>

      <div class="sb_footer-links-div">
        <h4>Social media</h4>
        <div class="socialmedia">
          <!-- social media images with lazy loading for better renderting time -->
          <p><img loading="lazy" src="../Assets/Images/instagram.svg" alt="Instagram"></p>
          <p><img loading="lazy" class="facebook" src="../Assets/Images/facebook.svg" alt="Facebook"></p>
          <p><img loading="lazy" src="../Assets/Images/youtube.svg" alt="YouTube"></p>
        </div>
      </div>
    </div>
    <!-- removed hr tag -->
    <div class="sb_footer-below">
      <div class="sb_footer-copyright">
        <p>© ${new Date().getFullYear()} RecycleNow. All rights reserved.</p>
      </div>
    </div>           
        `;
    footerContainer.innerHTML = footerHTML;
  } else {
    const footerHTML = `<div class="sb_footer-links">
      <div class="sb_footer-links-div">
        <h4>Contact</h4>
        <a href="/Employer">
          <p>Phone</p>
        </a>
        <a href="/Random">
          <p>email</p>
        </a>
        <a href="/Random2">
          <p>Address</p>
        </a>
      </div>

      <div class="sb_footer-links-div">
        <h4>RecycleNow</h4>
        <a href="/Random">
          <p>About</p>
        </a>
        <a href="/Random">
          <p>Terms & Conditions</p>
        </a>
      </div>

      <div class="sb_footer-links-div">
        <a href="./login/login.html" class="submit-button">Login</a>
        <h4>Social media</h4>
        <div class="socialmedia">
          <!-- social media images with lazy loading for better renderting time -->
          <p><img loading="lazy" src="./Assets/Images/instagram.svg" alt="Instagram"></p>
          <p><img loading="lazy" class="facebook" src="./Assets/Images/facebook.svg" alt="Facebook"></p>
          <p><img loading="lazy" src="./Assets/Images/youtube.svg" alt="YouTube"></p>
        </div>
      </div>
    </div>
    <!-- removed hr tag -->
    <div class="sb_footer-below">
      <div class="sb_footer-copyright">
        <p>© ${new Date().getFullYear()} RecycleNow. All rights reserved.</p>
      </div>
    </div>  `
    footerContainer.innerHTML = footerHTML;
  }
});
