import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../context/userContext.js"; // Import useUser hook
import "./header.css";

const Header = () => {
  const { user, logout } = useUser(); // Access user info and logout function
  const [navList, setNavList] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user data
    navigate("/"); // Redirect to home or login page
  };

  return (
    <>
      <header className="header">
        <div className="container flex">
          <div className="logo">
            <h1 className="app-title">
              <Link to="/">StudentConnect</Link>
            </h1>
          </div>

          <div className="button-group flex">
            {user ? ( // Check if user is logged in
              <>
                <h3 className="user-greeting">Hello, {user.username}</h3>
                <Link to="/editProfile">
                  <button className="btn btn-signout">Edit Profile</button>
                </Link>
                <button className="btn btn-signout" onClick={handleLogout}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-signup">
                  <Link to="/signUp" className="btn-link">
                    Sign Up
                  </Link>
                </button>
                <button className="btn btn-signin">
                  <Link to="/signIn" className="btn-link">
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
