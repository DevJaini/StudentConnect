import React from "react";
import { UserProvider } from "../../context/userContext.js"; // Correct path casing
import { Routes, Route } from "react-router-dom";
import Header from "../common/header/Header";
import Home from "../home/Home";
import SignUp from "../signUp/SignUp";
import SignIn from "../signIn/SignIn";
import ForgotPassword from "../forgotPassword/ForgotPassword.jsx"; // Ensure consistent naming
import Footer from "../common/footer/Footer";
import Listings from "../listings/Listings.jsx";
import AddListings from "../listings/addListing/AddListings.jsx";
import ViewSingleListing from "../listings/viewListing/ViewListing.jsx";
import ManageListings from "../listings/manageListing/ManageListings.jsx";
import EditListing from "../listings/editListing/EditListings.jsx";

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
          <Route path="/listings" element={<Listings />} />
          <Route path="/addListings" element={<AddListings />} />
          <Route path="/viewListing/:id" element={<ViewSingleListing />} />
          <Route path="/manageListings" element={<ManageListings />} />
          <Route path="/editListing/:id" element={<EditListing />} />

          {/* <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/addMarketplace" element={<AddMarketplace />} />
          <Route path="/viewMarketplace/:id" element={<ViewSingleMarketplace />} />
          <Route path="/manageMarketplace" element={<ManageMarketplace />} />
          <Route path="/editMarketplace/:id" element={<EditMarketplace />} /> */}
        </Routes>

        {/* Render the Footer outside of the Routes */}
        <Footer />
      </>
    </UserProvider>
  );
};

export default Pages;
