import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/userContext"; // Assuming you're using UserContext
import { viewListing } from "../../../api/listings"; // API for fetching listings
import "./hero.css";

const Hero = () => {
  const [school, setCollegeName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const { user } = useUser(); // UserContext to check if user is logged in
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    // Ensure priceMin and priceMax are numbers
    const priceMinValue = priceMin ? Number(priceMin) : undefined;
    const priceMaxValue = priceMax ? Number(priceMax) : undefined;

    if (!user) {
      setIsModalOpen(true); // Show modal if user is not logged in
      return;
    }

    try {
      const data = await viewListing({
        school,
        city,
        state,
        priceMin: priceMinValue,
        priceMax: priceMaxValue,
        category,
        type,
      });
      navigate("/listings", { state: { listings: data } }); // Pass results to listings page
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  const closeModal = () => setIsModalOpen(false); // Close modal

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Connecting Students, Simplifying Living</h1>
          <h3 className="hero-subtitle">
            Find shared spaces, explore student deals, and discover what's
            around you, all in one place
          </h3>
          <form className="flex" onSubmit={handleSearch}>
            <div className="box">
              <span>School</span>
              <input
                type="text"
                placeholder="School"
                value={school}
                onChange={(e) => setCollegeName(e.target.value)}
              />
            </div>
            <div className="box">
              <span>City</span>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="box">
              <span>State</span>
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="box">
              <span>Price Range (Min)</span>
              <input
                type="number"
                placeholder="Min Price"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
              />
            </div>
            <div className="box">
              <span>Price Range (Max)</span>
              <input
                type="number"
                placeholder="Max Price"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
              />
            </div>
            <div className="box">
              <span>Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Permanent Stay">Permanent Stay</option>
                <option value="Temporary Stay">Temporary Stay</option>
                <option value="Shared Space">Shared Space</option>
              </select>
            </div>
            <div className="box">
              <span>Type</span>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select</option>
                <option value="1 Beds">1 Bed</option>
                <option value="2 Beds">2 Beds</option>
                <option value="3 Beds">3 Beds</option>
                <option value="Studio">Studio</option>
              </select>
            </div>

            <button className="btn1" type="submit">
              <i className="fa fa-search"></i> Search
            </button>
          </form>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Please Log In or Sign Up</h2>
            <p>You need to log in or sign up to search listings.</p>
            <div className="modal-buttons">
              <button
                className="btn-login "
                onClick={() => navigate("/signIn")}
              >
                Log In
              </button>
              <button
                className="btn-signup"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
            <button className="btn-close" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
