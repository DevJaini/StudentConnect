import React, { useState } from "react";
import { marketplacelist } from "../../data/Data";

const MarketplaceCard = () => {
  const [visible, setVisible] = useState(3); // Show 6 items initially

  const handleViewMore = () => {
    setVisible((prevVisible) => prevVisible + 3); // Load 6 more items each time
  };

  return (
    <>
      <div className="content grid3 mtop">
        {marketplacelist.slice(0, visible).map((val, index) => {
          const { cover } = val;
          return (
            <div className="box shadow" key={index}>
              <div className="img">
                <img src={cover} alt="" />
              </div>
            </div>
          );
        })}
      </div>
      {visible < marketplacelist.length && (
        <div className="view-more-container">
          <button className="view-more-btn" onClick={handleViewMore}>
            View More
          </button>
        </div>
      )}
    </>
  );
};

export default MarketplaceCard;
