// footer.js
document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("footer-container");

  if (footerContainer) {
    // Determine the base path based on the current page's location
    const pathPrefix = window.location.pathname.includes("/shop/")
      ? "../../Assets/Images/"
      : "../Assets/Images/";

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
                            <h4>Social Media</h4>
                            <a href="/Random"><p>Random</p></a>
                            <a href="/Random"><p>Random</p></a>
                            <a href="/Random"><p>Random</p></a>
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
                            <h4>Follow Us</h4>
                            <div class="socialmedia">
                                <p><img src="${pathPrefix}instagram.svg" alt="Instagram" onerror="this.src='https://via.placeholder.com/24x24?text=Instagram'"></p>
                                <p><img class="facebook" src="${pathPrefix}facebook.svg" alt="Facebook" onerror="this.src='https://via.placeholder.com/24x24?text=Facebook'"></p>
                                <p><img src="${pathPrefix}youtube.svg" alt="YouTube" onerror="this.src='https://via.placeholder.com/24x24?text=YouTube'"></p>
                            </div>
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
  }
});
