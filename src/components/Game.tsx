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
  const [totalScore, setTotalScore] = useState(0);

  const questions = [
    {
      question: "What's most important for a junior frontend developer?",
      options: ["Understanding users", "Technical depth"],
      scores: [100, 70],
    },
    {
      question: "What makes a UI effective?",
      options: ["Simplicity and clarity", "Visual creativity"],
      scores: [70, 100],
    },
    {
      question: "Which approach to feedback is more valuable in a team?",
      options: ["Actively applying", "Thoughtfully considering"],
      scores: [100, 70],
    },
    {
      question: "What strengthens collaboration in a frontend team?",
      options: ["Regular updates and communication", "Independent progress"],
      scores: [100, 70],
    },
    {
      question: "Which growth approach is more valuable for junior developers?",
      options: ["Self-driven learning", "Completing tasks quickly"],
      scores: [100, 70],
    },
    {
      question: "What kind of code is more valuable?",
      options: ["Easy to maintain and read", "Short and efficient"],
      scores: [100, 70],
    },
    {
      question: "What kind of ideas stand out in junior devs?",
      options: ["Creative suggestions	", "Completing requirements"],
      scores: [100, 70],
    },
    {
      question: "What makes a junior developer more trustworthy?",
      options: ["Reporting only when finished", "Sharing progress frequently"],
      scores: [70, 100],
    },
  ];

  const handleChoice = (trait: string, index: number) => {
    setSelectedTraits([...selectedTraits, trait]);
    setTotalScore(totalScore + questions[currentQuestion].scores[index]);

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

  const averageScore = Math.round(totalScore / (currentQuestion + 1));

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
              onSelect={(trait) =>
                handleChoice(
                  trait,
                  trait === questions[currentQuestion].options[0] ? 0 : 1
                )
              }
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
              <div className="score-container">
                <div className="score-label">Score</div>
                <div className="score-display">{averageScore}</div>
              </div>
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
