import React from "react";
import "./hero.css";

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Connecting Students, Simplifying Living</h1>
          <h3 style={{ color: "white", textAlign: "center" }}>
            Find shared spaces, explore student deals, and discover what's
            around you, all in one place
          </h3>
          <form className="flex">
            <div className="box">
              <span>College Name</span>
              <input type="text" placeholder="College Name" />
            </div>
            <div className="box">
              <span>Location</span>
              <input type="text" placeholder="Location" />
            </div>
            <div className="box">
              <span>Price Range</span>
              <input type="text" placeholder="Price Range" />
            </div>
            <div className="box">
              <h4>Advance Filter</h4>
            </div>
            <button className="btn1">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Hero;
