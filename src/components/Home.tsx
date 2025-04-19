import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setIsTransitioning(true);
    // Wait for animation to complete before navigating
    setTimeout(() => {
      navigate("/game");
    }, 2000); // Match this with the CSS animation duration
  };

  return (
    <div className="container">
      <div className={`character alice ${isTransitioning ? "fade-out" : ""}`}>
        <img src={process.env.PUBLIC_URL + "/alice.png"} alt="Alice" />
        <div className="label">Alice</div>
      </div>

      <div className={`vs-container ${isTransitioning ? "grow" : ""}`}>
        <span className={`vs ${isTransitioning ? "grow" : ""}`}>VS</span>
        <div className={`lightning ${isTransitioning ? "fade-out" : ""}`}></div>
        <button
          className={`start-button ${isTransitioning ? "fade-out" : ""}`}
          onClick={handleStart}
          disabled={isTransitioning}
        >
          Start Game
        </button>
      </div>

      <div className={`character monster ${isTransitioning ? "fade-out" : ""}`}>
        <img src={process.env.PUBLIC_URL + "/others.png"} alt="Others" />
        <div className="label">Others</div>
      </div>
    </div>
  );
};

export default Home;
