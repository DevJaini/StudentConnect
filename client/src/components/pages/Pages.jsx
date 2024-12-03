import React from "react";
import { UserProvider } from "../../context/userContext.js"; // Correct path casing
import { ChatProvider } from "../../context/ChatContext.js"; // Correct path casing

import { Routes, Route } from "react-router-dom";
import Header from "../common/header/Header";
import Home from "../home/Home";
import SignUp from "../signUp/SignUp";
import SignIn from "../signIn/SignIn";
import ForgotPassword from "../forgotPassword/ForgotPassword.jsx"; // Ensure consistent naming
import Profile from "../profile/Profile.jsx";
import ResetPassword from "../resetPassword/resetPassword.jsx";
import Footer from "../common/footer/Footer";
import Listings from "../listings/Listings.jsx";
import AddListings from "../listings/addListing/AddListings.jsx";
import ViewSingleListing from "../listings/viewListing/ViewListing.jsx";
import ManageListings from "../listings/manageListing/ManageListings.jsx";
import EditListing from "../listings/editListing/EditListings.jsx";
import Marketplace from "../marketplace/Marketplace.jsx";
import AddMarketplace from "../marketplace/addMarketplace/AddMarketplace.jsx";
import ViewMarketplace from "../marketplace/viewMarketplace/ViewMarketplace.jsx";
import ManageMarketplace from "../marketplace/manageMarketplace/ManageMarketplace.jsx";
import EditMarketplace from "../marketplace/editMarketplace/EditMarketplace.jsx";
import ChatPage from "../chat/Chat.jsx";
import ChatHistory from "../chat/ChatHistory.js";

const Pages = () => {
  return (
    <UserProvider>
      <ChatProvider>
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
            <Route path="/editProfile" element={<Profile />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/addListings" element={<AddListings />} />
            <Route path="/viewListing" element={<ViewSingleListing />} />
            <Route path="/manageListings" element={<ManageListings />} />
            <Route path="/editListing" element={<EditListing />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/addMarketplace" element={<AddMarketplace />} />
            <Route path="/viewMarketplace" element={<ViewMarketplace />} />
            <Route path="/manageMarketplace" element={<ManageMarketplace />} />
            <Route path="/editMarketplace" element={<EditMarketplace />} />
            <Route path="/chatHistory" element={<ChatHistory />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>

          {/* Render the Footer outside of the Routes */}
          <Footer />
        </>
      </ChatProvider>
    </UserProvider>
  );
};

export default Pages;
