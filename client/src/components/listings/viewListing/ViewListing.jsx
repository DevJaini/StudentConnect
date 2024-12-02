import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Slider from "react-slick"; // React Slick for slider
import { viewListing } from "../../../api/listings";
import { FaMapMarkerAlt, FaSchool, FaUser } from "react-icons/fa";
import { useUser } from "../../../context/userContext.js"; // Import useUser hook
import "./viewListing.css";

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

const ViewSingleListing = () => {
  const { user } = useUser(); // Access user info and logout function
  const location = useLocation();
  const { id } = location.state || {}; // Destructure id from state

  const [listing, setListing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await viewListing({ id });
        setListing(data[0]);
      } catch (error) {
        console.error("Error fetching listing:", error);
        navigate("/"); // Navigate back to home on error
      }
    };
    fetchListing();
  }, [id, navigate]);

  if (!listing) {
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
    <div className="single-listing-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back to Listings
      </button>
      {/* Category Section */}
      {listing.category && (
        <div className="category-box">
          <span className="category-text">{listing.category}</span>
        </div>
      )}

      {/* Hero Section with Slider */}
      <div className="hero-section">
        <Slider {...sliderSettings} className="image-slider">
          {listing.images?.map((image, index) => (
            <div key={index} className="slider-image-wrapper">
              <img
                src={image}
                alt={`Property view ${index + 1}`}
                className="slider-image"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="listing-header">
        <h1 className="listing-title">{listing.title}</h1>
        <div className="listing-location">
          <FaMapMarkerAlt className="location-icon" />
          <span>{`${listing.address}, ${listing.city}, ${listing.state}`}</span>
        </div>
        <p className="listing-location">{listing.location}</p>

        {listing.school && (
          <div className="listing-school">
            <FaSchool className="school-icon" />
            <p>School: {listing.school}</p>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="info-box">
        <div className="info-item">
          <strong>Rent: </strong> ${listing.price} / month
        </div>
        <div className="info-item">
          <strong>Type: </strong> {listing.type}
        </div>
        <div className="info-item">
          <strong>Size: </strong> {listing.size} sqft
        </div>
        <div className="info-item">
          <strong>Bathrooms: </strong> {listing.bathrooms}
        </div>
      </div>

      {/* Offer Section */}
      {listing.offers && (
        <div className="offer-box-inline">
          <h3>Special Offers: </h3>
          <span> {listing.offers}</span>
        </div>
      )}

      {/* Description Section */}
      <div className="description-section">
        <h3>About this property</h3>
        <p>{listing.description}</p>
      </div>

      {/* Features Section */}
      {listing.facilities && (
        <div className="listing-header">
          <h3>Property Features</h3>
          <span>{listing.facilities}</span>
        </div>
      )}

      {/* Fees and Policies Section */}
      {/* Features Section */}
      {listing.fees_policies && (
        <div className="listing-header">
          <h3>Fees and Policies</h3>
          <span>{listing.fees_policies}</span>
        </div>
      )}

      {/* Contact Section */}
      <div className="contact-section">
        <h3>Seller Information</h3>
        <div className="seller-info">
          <FaUser className="seller-icon" />
          <span>&nbsp;&nbsp;{user.username}</span>
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

export default ViewSingleListing;

//streamchat
//userId from token
