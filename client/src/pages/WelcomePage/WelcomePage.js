import React from "react";
import Navbar from "../../components/navbar/Navbar.js";
import HomePage from "../../components/HomePage/HomePage.js";
import SecondPage from "../../components/SecondPage/SecondPage.js";
import ThirdPage from "../../components/ThirdPage/ThirdPage.js";
import "./WelcomePage.css";

function WelcomePage() {
  return (
    <>
      <Navbar />
      <HomePage />
      <SecondPage />
      <ThirdPage />
    </>
  );
}

export default WelcomePage;
