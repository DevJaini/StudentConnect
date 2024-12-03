import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick"; // React Slick for slider
import { viewMarketplaceItem } from "../../../api/marketplace"; // Replace API function
import { FaMapMarkerAlt } from "react-icons/fa"; // Change icons if needed
import { useChat } from "../../../context/ChatContext"; // Assuming useChat context

import "./viewMarketplace.css";
import { getProfile } from "../../../api/user.js";

// Custom arrow components
const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow custom-next-arrow`}
    style={{ ...style }}
    onClick={onClick}
  />
);

const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow custom-prev-arrow`}
    style={{ ...style }}
    onClick={onClick}
  />
);

const ViewMarketplace = () => {
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {}; // Destructure id from state
  const { addChat } = useChat(); // Assume you have a function to add a new chat in the context

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await viewMarketplaceItem({ id });
        setItem(data[0]);
      } catch (error) {
        console.error("Error fetching item:", error);
        navigate("/marketplace"); // Navigate back to marketplace on error
      }
    };
    fetchItem();
  }, [id, navigate]);

  if (!item) {
    return <p>Loading...</p>;
  }

  // React Slick settings for the slider with custom arrows
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handleContactSeller = async () => {
    // Create or update the chat based on listing and seller
    const userProfile = await getProfile({ id: item.user_id }); // Call your common getProfile function

    addChat(
      `marketplace-${item.id}-${userProfile[0].id}`,
      item,
      userProfile[0].id,
      userProfile[0].username,
      "marketplace",
      []
    ); // Add this chat to the context or local state

    // Navigate to the chat page for this specific chat
    navigate(`/chat`, {
      state: {
        item: item,
        itemId: item.id,
        sellerId: userProfile[0].id,
        sellerName: userProfile[0].username,
        itemType: "marketplace",
      },
    });
  };

  return (
    <div className="single-item-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back to Marketplace
      </button>
      {/* Category Section */}
      {item.category && (
        <div className="category-box">
          <span className="category-text">{item.category}</span>
        </div>
      )}

      {/* Hero Section with Slider */}
      <div className="hero-section">
        <Slider {...sliderSettings} className="image-slider">
          {item.images?.map((image, index) => (
            <div key={index} className="slider-image-wrapper">
              <img
                src={image}
                alt={`Item view ${index + 1}`}
                className="slider-image"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Item Details Section */}
      <div className="item-header">
        <h1 className="item-title">{item.title}</h1>
        <div className="item-location">
          <FaMapMarkerAlt className="location-icon" />
          <span>{`${item.address}, ${item.city}, ${item.state}`}</span>
        </div>
        <p className="item-price">${item.price}</p>
      </div>

      {/* Description Section */}
      <div className="description-section">
        <h3>About this Item</h3>
        <p>{item.description}</p>
      </div>

      {/* Features Section */}
      {item.features && (
        <div className="features-section">
          <h3>Item Features</h3>
          <ul>
            {item.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Contact Section */}
      <div className="contact-section">
        <button className="btn" onClick={handleContactSeller}>
          Contact Seller
        </button>
      </div>
    </div>
  );
};

export default ViewMarketplace;
