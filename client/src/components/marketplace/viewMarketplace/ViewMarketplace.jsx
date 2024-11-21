import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick"; // React Slick for slider
import { viewItem } from "../../../api/marketplace"; // Replace API function
import { FaMapMarkerAlt, FaUser } from "react-icons/fa"; // Change icons if needed
import "./viewMarketplace.css";

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

const ViewSingleItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await viewItem(id);
        setItem(data);
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
          <span>{item.location}</span>
        </div>
        <p className="item-price">${item.price}</p>
      </div>

      {/* Description Section */}
      <div className="description-section">
        <h2>About this Item</h2>
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
        <h3>Seller Information</h3>
        <div className="seller-info">
          <FaUser className="seller-icon" />
          <span>{item.sellerName}</span>
        </div>
        <button
          onClick={() => alert("Contacting seller...")}
          className="contact-btn"
        >
          Contact Seller
        </button>
      </div>
    </div>
  );
};

export default ViewSingleItem;
