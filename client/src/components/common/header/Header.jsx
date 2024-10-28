import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../../context/userContext.js"; // Import useUser hook
import "./header.css";

const Header = () => {
  const { user } = useUser(); // Access user info from context
  const [navList, setNavList] = useState(false);

  return (
    <>
      <header className="header a">
        <div className="container flex">
          <div className="logo">
            <h1 className="color">
              <Link to="/">StudentConnect</Link>
            </h1>
          </div>

          <div className="button flex">
            {user ? ( // Check if user is logged in
              <>
                <h3
                  style={{
                    color: "#27ae60",
                    fontFamily: "Poppins",
                    marginRight: "15px",
                  }}
                >
                  Hello, {user.username} {/* Display username */}
                </h3>{" "}
                <button className="btn1">
                  <Link
                    to="/signOut"
                    style={{
                      color: "white",
                      fontFamily: "Poppins",
                    }}
                  >
                    Sign Out
                  </Link>
                </button>
              </>
            ) : (
              <>
                <button className="btn1">
                  <Link
                    to="/signUp"
                    style={{
                      color: "white",
                      fontFamily: "Poppins",
                    }}
                  >
                    Sign Up
                  </Link>
                </button>
                <button className="btn1">
                  <Link
                    to="/signIn"
                    style={{
                      color: "white",
                      fontFamily: "Poppins",
                    }}
                  >
                    Sign In
                  </Link>
                </button>
              </>
            )}
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
