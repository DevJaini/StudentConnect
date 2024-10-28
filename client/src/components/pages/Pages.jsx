import React from "react";
import { UserProvider } from "../../context/userContext.js"; // Correct path casing
import { Routes, Route } from "react-router-dom";
import Header from "../common/header/Header";
import Home from "../home/Home";
import SignUp from "../signUp/SignUp";
import SignIn from "../signIn/SignIn";
import ForgotPassword from "../forgotPassword/ForgotPassword.jsx"; // Ensure consistent naming
import Footer from "../common/footer/Footer";

const Pages = () => {
  return (
    <UserProvider>
      {" "}
      {/* Wrap entire Pages component with UserProvider */}
      <>
        {/* Render the Header outside of the Routes */}
        <Header />

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>

        {/* Render the Footer outside of the Routes */}
        <Footer />
      </>
    </UserProvider>
  );
};

export default Pages;
