import React from "react";
import "./Character.css";

interface CharacterProps {
  progress?: number;
}

const Character: React.FC<CharacterProps> = ({ progress = 0 }) => {
  const petals = 8; // Number of petals in the flower
  const petalProgress = progress / (100 / petals); // Progress per petal

  return (
    <div className="character-container">
      <div className="flower">
        {/* Center of the flower */}
        <div className="flower-center" />

        {/* Petals */}
        {Array.from({ length: petals }).map((_, index) => (
          <div
            key={index}
            className={`petal ${
              index < Math.floor(petalProgress) ? "filled" : ""
            }`}
            style={{
              transform: `rotate(${index * (360 / petals)}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Character;
