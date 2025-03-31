document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("footer-container");

  if (footerContainer) {
    const pathPrefix = window.location.pathname.includes("/shop/")
      ? "../../Assets/Images/"
      : "../Assets/Images/";

    // Check if the user is logged in (using stored userId)
    const isLoggedIn = localStorage.getItem("userId") !== null;

    const footerHTML = `
              <footer class="footer">
                  <div class="sb_footer section_padding">
                      <div class="sb_footer-links">
                          <div class="sb_footer-links-div">
                              <h4>For Business</h4>
                              <a href="/Employer"><p>Employer</p></a>
                              <a href="/Random"><p>Random</p></a>
                              <a href="/Random2"><p>Random2</p></a>
                          </div>
                          <div class="sb_footer-links-div">
                              <h4>Resources</h4>
                              <a href="/Random"><p>Random</p></a>
                              <a href="/Random"><p>Random</p></a>
                              <a href="/Random"><p>Random</p></a>
                          </div>
                          <div class="sb_footer-links-div">
                              <h4>Partners</h4>
                              <a href="/Random"><p>Random</p></a>
                              <a href="/Random"><p>Random</p></a>
                              <a href="/Random"><p>Random</p></a>
                          </div>
                          <div class="sb_footer-links-div">
                              <h4>Company</h4>
                              <a href="/Employer"><p>Employer</p></a>
                              <a href="/Random"><p>Random</p></a>
                              <a href="/Random2"><p>Random2</p></a>
                          </div>
                          <div class="sb_footer-links-div">
                              <button id="auth-button" class="auth-btn">
                                ${isLoggedIn ? "Log Out" : "Log In"}
                              </button>
                          </div>
                      </div>
                      <hr>
                      <div class="sb_footer-below">
                          <div class="sb_footer-copyright">
                              <p>© ${new Date().getFullYear()} RecycleNow. All rights reserved.</p>
                          </div>
                          <div class="sb_footer-below-links">
                              <a href="/terms"><div><p>Terms & Conditions</p></div></a>
                              <a href="/terms"><div><p>Privacy</p></div></a>
                              <a href="/terms"><div><p>Security</p></div></a>
                              <a href="/terms"><div><p>Cookies</p></div></a>
                          </div>
                      </div>
                  </div>
              </footer>
          `;

    footerContainer.innerHTML = footerHTML;

    // Handle login/logout button click
    document.getElementById("auth-button").addEventListener("click", () => {
      if (isLoggedIn) {
        localStorage.removeItem("userId"); // Remove userId to log out
        window.location.reload();
      } else {
        window.location.href = "/UNI_WebRecyclingProject/html/login/login.html";
      }
    });
  }
});
