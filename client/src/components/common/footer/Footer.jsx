import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <section className="footerContact">
        <div className="container">
          <div className="send flex">
            <div className="text">
              <h1>Do You Have Questions ?</h1>
              <p>We'll help you to grow your career and growth.</p>
            </div>
            <a href="mailto:support@studentconnect.com?subject=Contact%20Us%20Inquiry&body=Hello,%20I%20have%20a%20question%20about%20...">
              <button className="btn5">Contact Us Today</button>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div>
            <div className="logo">
              <h1 className="color">StudentConnect</h1>
              <h2>Do You Need Help With Anything?</h2>
              <p>
                Receive updates, hot deals, tutorials, discounts sent straignt
                in your inbox every month
              </p>

              <div className="input flex">
                <input type="text" placeholder="Email Address" />
                <button style={{ margin: "10px" }}>Subscribe</button>
              </div>
            </div>
          </div>
          <div></div>
          <div>
            <div class="contact-info">
              <p>
                <strong>Contact Us:</strong>
              </p>
              <p>Email: support@studentconnect.com</p>
              <p>Phone: +1-800-123-4567</p>
            </div>
            <div class="social-media">
              <p>
                <strong>Follow Us:</strong>
              </p>
              <a href="https://facebook.com/studentconnect">Facebook</a>
              <a href="https://twitter.com/studentconnect">Twitter</a>
              <a href="https://instagram.com/studentconnect">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
      <div className="legal">
        <span>© 2024 StudentConnect. Designd By Jaini.</span>
      </div>
    </>
  );
};

export default Footer;
