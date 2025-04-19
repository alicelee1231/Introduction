import React from "react";
import "./Choice.css";

interface ChoiceProps {
  question: string;
  option1: string;
  option2: string;
  onSelect: (trait: string) => void;
}

const Choice: React.FC<ChoiceProps> = ({
  question,
  option1,
  option2,
  onSelect,
}) => {
  return (
    <div className="choice-container">
      <h2 style={{ color: "rgb(255, 149, 0)" }}>{question}</h2>
      <div className="traits-grid">
        <button className="trait-button" onClick={() => onSelect(option1)}>
          {option1}
        </button>
        <button className="trait-button" onClick={() => onSelect(option2)}>
          {option2}
        </button>
      </div>
    </div>
  );
};

export default Choice;
