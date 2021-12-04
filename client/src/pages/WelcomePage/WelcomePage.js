import React from "react";
import Navbar from "../../components/HomePageAreas/navbar/Navbar.js";
import HomePage from "../../components/HomePageAreas/HomePage/HomePage.js";
import HomePageSecondArea from "../../components/HomePageAreas/HomePageSecondArea/HomePageSecondArea.js";
import HomePageThirdArea from "../../components/HomePageAreas/HomePageThirdArea/HomePageThirdArea.js";


function WelcomePage() {
  return (
    <>
      <Navbar />
      <HomePage />
      <HomePageSecondArea />
      <HomePageThirdArea />
    </>
  );
}

export default WelcomePage;
