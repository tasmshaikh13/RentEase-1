import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HeroSection = () => {
  return (
    <div
      className="hero-section text-center text-white d-flex flex-column align-items-center justify-content-center p-5"
      style={{
        background: "url('logo.png') no-repeat center/cover",
        height: "50vh",
        width: "100%",
      }}
    >
      <div className="mt-3"></div>
    </div>
  );
};

export default HeroSection;
