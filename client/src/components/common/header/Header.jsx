import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [navList, setNavList] = useState(false);

  return (
    <>
      <header className="header a">
        <div className="container flex">
          <div className="logo">
            {/* <img src='./images/logo.png' alt='' /> */}
            <h1 className="color">
              <Link to="/"> StudentConnect</Link>
            </h1>
          </div>

          <div className="button flex">
            <button className="btn1">
              <i className="fa fa-sign-in">
                <Link
                  to="/signUp"
                  style={{
                    color: "white",
                    fontFamily: "Poppins",
                  }}
                >
                  Sign Up
                </Link>
              </i>
            </button>
            <button className="btn1">
              <i className="fa fa-sign-in">
                <Link
                  to="/signIn"
                  style={{
                    color: "white",
                    fontFamily: "Poppins",
                  }}
                >
                  Sign In
                </Link>
              </i>
            </button>
          </div>

          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
