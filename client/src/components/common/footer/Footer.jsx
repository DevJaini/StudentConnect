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
            <button className="btn5">Contact Us Today</button>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div>
            <div className="logo">
              {/* <img src='../images/logo-light.png' alt='' /> */}
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
        </div>
      </footer>
      <div className="legal">
        <span>© 2024 StudentConnect. Designd By Jaini.</span>
      </div>
    </>
  );
};

export default Footer;
