import React, { useState } from "react";
import Character from "./Character";
import Choice from "./Choice";
import EmailForm from "./EmailForm";
import Angel from "./Angel";
import EndPage from "./EndPage";
import "./Game.css";

const Game: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [showEndPage, setShowEndPage] = useState(false);

  const questions = [
    {
      question: "Which trait you want to hire?",
      options: ["Adaptability", "Creativity"],
    },
    {
      question: "Which trait you want to hire?",
      options: ["Team Player", "Independent"],
    },
    {
      question: "Which trait you want to hire?",
      options: ["Detail-Oriented", "Big Picture Thinker"],
    },
    {
      question: "Which trait you want to hire?",
      options: ["Fast Learner", "Experienced"],
    },
    {
      question: "Which trait you want to hire?",
      options: ["Problem Solver", "Process Follower"],
    },
  ];

  const handleChoice = (trait: string) => {
    setSelectedTraits([...selectedTraits, trait]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowEmailForm(true);
    }
  };

  const handlePick = () => {
    setMessage("Thank you for your interest! 🎉");
    setShowEmailForm(false);
    setShowEndPage(true);
  };

  const handleDrop = () => {
    setMessage("Thank you for your feedback! 💪");
    setShowEmailForm(false);
    setShowEndPage(true);
  };

  if (showEndPage) {
    return <EndPage />;
  }

  return (
    <div className="game-container">
      <div className="game-content">
        {!showEmailForm ? (
          <>
            <h1>Welcome to my introduction game!</h1>
            <Character progress={(currentQuestion / questions.length) * 100} />
            <Choice
              question={questions[currentQuestion].question}
              option1={questions[currentQuestion].options[0]}
              option2={questions[currentQuestion].options[1]}
              onSelect={handleChoice}
            />
          </>
        ) : (
          <>
            <h1>That's Me! Alice! </h1>
            <div className="alice-container">
              <img
                src={process.env.PUBLIC_URL + "/alice.png"}
                alt="Alice"
                className="alice-image"
              />
            </div>
            <EmailForm
              onPick={handlePick}
              onDrop={handleDrop}
              message={message}
            />
          </>
        )}
        {message && <div className="error-message">{message}</div>}
        <Angel size={80} />
      </div>
    </div>
  );
};

export default Game;
