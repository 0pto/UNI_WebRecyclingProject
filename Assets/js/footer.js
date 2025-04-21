document.addEventListener("DOMContentLoaded", () => {
  const allCookies = document.cookie;
  let userSessionObj = {};
  const cookiesArray = allCookies.split(";");
  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    userSessionObj[key.trim()] = value;
  });

  const footerContainer = document.getElementById("footer-container");

  // ✅ Root-relative path that works on all pages
  const iconPath = "/UNI_WebRecyclingProject/Assets/Images/";

  const socialIconsHTML = `
    <div class="socialmedia">
      <p><img loading="lazy" src="${iconPath}instagram.svg" alt="Instagram" /></p>
      <p><img loading="lazy" class="facebook" src="${iconPath}facebook.svg" alt="Facebook" /></p>
      <p><img loading="lazy" src="${iconPath}youtube.svg" alt="YouTube" /></p>
    </div>
  `;

  if (footerContainer) {
    const footerHTML = `
      <div class="sb_footer-links">
        <div class="sb_footer-links-div">
          <h4>Contact</h4>
          <a href="#"><p>Phone</p></a>
          <a href="#"><p>email</p></a>
          <a href="#"><p>Address</p></a>
        </div>

        <div class="sb_footer-links-div">
          <h4>RecycleNow</h4>
          <a href="#"><p>About</p></a>
          <a href="#"><p>Terms & Conditions</p></a>
        </div>

        <div class="sb_footer-links-div">
          ${
            userSessionObj.RecycleNowJwt
              ? "<h4>Social media</h4>"
              : `<a href="/UNI_WebRecyclingProject/login/login.html" class="submit-button">Login</a><h4>Social media</h4>`
          }
          ${socialIconsHTML}
        </div>
      </div>

      <div class="sb_footer-below">
        <div class="sb_footer-copyright">
          <p>© ${new Date().getFullYear()} RecycleNow. All rights reserved.</p>
        </div>
      </div>
    `;

    footerContainer.innerHTML = footerHTML;
  }
});
