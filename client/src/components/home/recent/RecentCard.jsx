import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { list } from "../../data/Data";

const RecentCard = () => {
  const [visible] = useState(3);

  const navigate = useNavigate(); // Set up navigation

  const handleViewMore = () => {
    navigate("/listings"); // Redirect to the ListingPage
  };

  return (
    <>
      <div className="content grid3 mtop">
        {list.slice(0, visible).map((val, index) => {
          const { cover, category, location, name, price, type } = val;
          return (
            <div className="box shadow" key={index}>
              <div className="img">
                <img src={cover} alt="" />
              </div>
              <div className="text">
                <div className="category flex">
                  <span
                    style={{
                      background:
                        category === "Temporary Stay"
                          ? "#25b5791a"
                          : "#ff98001a",
                      color:
                        category === "Temporary Stay" ? "#25b579" : "#ff9800",
                    }}
                  >
                    {category}
                  </span>
                </div>
                <h4>{name}</h4>
                <p>
                  <i className="fa fa-location-dot"></i> {location}
                </p>
              </div>
              <div className="button flex">
                <div>
                  <button className="btn2">{price}</button>{" "}
                  <label htmlFor="">/sqft</label>
                </div>
                <span>{type}</span>
              </div>
            </div>
          );
        })}
      </div>
      {visible < list.length && (
        <div className="view-more-container">
          <button className="view-more-btn" onClick={handleViewMore}>
            View More
          </button>
        </div>
      )}
    </>
  );
};

export default RecentCard;
