import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../common/header/Header";
import Home from "../home/Home";
import SignUp from "../signUp/SignUp";
import SignIn from "../signIn/SignIn";
import Footer from "../common/footer/Footer";

const Pages = () => {
  return (
    <>
      {/* Render the Header outside of the Routes */}
      <Header />

      {/* Define routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>

      {/* Render the Footer outside of the Routes */}
      <Footer />
    </>
  );
};

export default Pages;
