// footer.js
document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("footer-container");

  const footerHTML = `
        <div class="footer">
            <div class="sb_footer section_padding">
                <div class="sb_footer-links">
                    <div class="sb_footer-links-div">
                        <h4>For Business</h4>
                        <a href="/Employer"><p>Employer</p></a>
                        <a href="/Random"><p>Random</p></a>
                        <a href="/Random2"><p>Random2</p></a>
                    </div>
                    <div class="sb_footer-links-div">
                        <h4>Social media</h4>
                        <a href="/Random"><p>Random</p></a>
                        <a href="/Random"><p>Random</p></a>
                        <a href="/Random"><p>Random</p></a>
                    </div>
                    <div class="sb_footer-links-div">
                        <h4>Random</h4>
                        <a href="/Random"><p>Random</p></a>
                        <a href="/Random"><p>Random</p></a>
                        <a href="/Random"><p>Random</p></a>
                    </div>
                    <div class="sb_footer-links-div">
                        <h4>Random</h4>
                        <a href="/Random"><p>Random</p></a>
                        <a href="/Random"><p>Random</p></a>
                        <a href="/Random"><p>Random</p></a>
                    </div>
                    <div class="sb_footer-links-div">
                        <h4>Random</h4>
                        <a href="/Employer"><p>Employer</p></a>
                        <a href="/Random"><p>Random</p></a>
                        <a href="/Random2"><p>Random2</p></a>
                    </div>
                    <div class="sb_footer-links-div">
                        <h4>Social media</h4>
                        <div class="socialmedia">
                            <p><img src="Assets/Images/instagram.svg" alt="Instagram"></p>
                            <p><img class="facebook" src="Assets/Images/facebook.svg" alt="Facebook"></p>
                            <p><img src="Assets/Images/youtube.svg" alt="YouTube"></p>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="sb_footer-below">
                    <div class="sb_footer-copyright">
                        <p>@${new Date().getFullYear()} CodeInn. All rights reserved.</p>
                    </div>
                    <div class="sb_footer-below-links">
                        <a href="/terms"><div><p>Terms & Conditions</p></div></a>
                        <a href="/terms"><div><p>Privacy</p></div></a>
                        <a href="/terms"><div><p>Security</p></div></a>
                        <a href="/terms"><div><p>Cookies</p></div></a>
                    </div>
                </div>
            </div>
        </div>
    `;

  footerContainer.innerHTML = footerHTML;
});
