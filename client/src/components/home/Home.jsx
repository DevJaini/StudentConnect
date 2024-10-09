import React from "react";
import Featured from "./featured/Featured";
import Hero from "./hero/Hero";
import Recent from "./recent/Recent";
import Marketplace from "../home/marketplace/Marketplace";

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Recent />
      <Marketplace />
    </>
  );
};

export default Home;
