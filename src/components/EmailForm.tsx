import React, { useState } from "react";
import { sendEmail } from "../services/emailService";
import "./EmailForm.css";

interface EmailFormProps {
  onPick: () => void;
  onDrop: (feedback: string) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ onPick, onDrop }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [thumbsDown, setThumbsDown] = useState<
    Array<{ id: number; style: React.CSSProperties }>
  >([]);
  const [clovers, setClovers] = useState<
    Array<{ id: number; style: React.CSSProperties }>
  >([]);

  const createHeart = () => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤";

    // Random starting position across the width of the screen
    const startX = Math.random() * window.innerWidth;
    // Random ending X position (spread)
    const endX = (Math.random() - 0.5) * 200;
    // Random rotation
    const rotate = (Math.random() - 0.5) * 360;

    heart.style.setProperty("--x", `${endX}px`);
    heart.style.setProperty("--rotate", `${rotate}deg`);
    heart.style.left = `${startX}px`;
    heart.style.top = "0px";

    document.body.appendChild(heart);

    // Remove the heart element after animation
    setTimeout(() => {
      heart.remove();
    }, 3000);
  };

  const createWhy = () => {
    const why = document.createElement("div");
    why.className = "why-text";
    why.innerHTML = "WHY?";

    const startX = Math.random() * window.innerWidth;
    const endX = (Math.random() - 0.5) * 300;
    const rotate = (Math.random() - 0.5) * 180;
    const scale = 0.5 + Math.random() * 1.5; // Random size between 0.5x and 2x

    why.style.setProperty("--x", `${endX}px`);
    why.style.setProperty("--rotate", `${rotate}deg`);
    why.style.setProperty("--scale", scale.toString());
    why.style.left = `${startX}px`;
    why.style.top = "0px";

    document.body.appendChild(why);

    setTimeout(() => {
      why.remove();
    }, 2000);
  };

  const createHeartShower = () => {
    // Create multiple hearts
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        createHeart();
      }, i * 60); // Stagger the creation of hearts
    }
  };

  const createWhyShower = () => {
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        createWhy();
      }, i * 100); // Slightly slower spawn rate for WHY text
    }
  };

  const createThumbsDown = () => {
    const newThumbsDown = [];
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * (window.innerHeight / 2);
      const rotate = Math.random() * 360;
      const scale = 0.5 + Math.random() * 1;

      newThumbsDown.push({
        id: Date.now() + i,
        style: {
          left: `${x}px`,
          top: `${y}px`,
          "--x": `${Math.random() * 200 - 100}px`,
          "--rotate": `${rotate}deg`,
          "--scale": scale,
        } as React.CSSProperties,
      });
    }
    setThumbsDown(newThumbsDown);
    setTimeout(() => setThumbsDown([]), 2000);
  };

  const createClover = () => {
    const newClovers = [];
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * window.innerWidth;
      const y = window.innerHeight - Math.random() * (window.innerHeight / 2);
      const rotate = Math.random() * 360;
      const scale = 0.5 + Math.random() * 1;

      newClovers.push({
        id: Date.now() + i,
        style: {
          left: `${x}px`,
          top: `${y}px`,
          "--x": `${Math.random() * 200 - 100}px`,
          "--rotate": `${rotate}deg`,
          "--scale": scale,
        } as React.CSSProperties,
      });
    }
    setClovers(newClovers);
    setTimeout(() => setClovers([]), 2000);
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.preventDefault();
    createThumbsDown();
    onPick();
  };

  const handleSubmit = async (action: "pick" | "drop") => {
    try {
      if (action === "pick") {
        createHeartShower();
        const companyName = prompt("Please enter your company name:");
        if (!companyName) return;

        console.log("📨 EMAIL TO SEND:", {
          to: process.env.REACT_APP_RECIPIENT_EMAIL,
          subject: "New Introduction Game Response",
          text: `${companyName} liked your introduction! 🎉`,
        });

        const emailResult = await sendEmail({
          to: process.env.REACT_APP_RECIPIENT_EMAIL!,
          subject: "New Introduction Game Response",
          text: `${companyName} liked your introduction! 🎉`,
          html: `<h1>${companyName} liked your introduction! 🎉</h1>`,
        });

        if (!emailResult.success) {
          throw new Error("Failed to send email");
        }

        onPick();
        alert("Thank you for your interest! 🎉");
      } else {
        createWhyShower();
        setShowFeedback(true);
      }
    } catch (error) {
      alert("Sorry, there was an error. Please try again later.");
      console.error("Error:", error);
    }
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      createClover();
      const emailResult = await sendEmail({
        to: process.env.REACT_APP_RECIPIENT_EMAIL!,
        subject: "Introduction Game Feedback",
        text: `Feedback: ${feedback}`,
        html: `<h1>Feedback Received</h1><p>${feedback}</p>`,
      });

      if (!emailResult.success) {
        throw new Error("Failed to send feedback");
      }

      onDrop(feedback);
      setShowFeedback(false);
      setFeedback("");
    } catch (error) {
      alert(
        "Sorry, there was an error sending your feedback. Please try again later."
      );
      console.error("Error:", error);
    }
  };

  return (
    <div className="email-form-container">
      {thumbsDown.map((thumb) => (
        <div key={thumb.id} className="thumbs-down" style={thumb.style}>
          👎
        </div>
      ))}
      {clovers.map((clover) => (
        <div key={clover.id} className="clover" style={clover.style}>
          🍀
        </div>
      ))}

      {!showFeedback ? (
        <>
          <h2 style={{ color: "rgb(255, 149, 0)" }}>
            Thank you for playing!
            <br /> If you want to know about me more?
            <br /> Just click the{" "}
            <span
              style={{
                color: "#ff4d4d",
                textShadow: "0 0 10px rgba(255, 77, 77, 0.5)",
                fontSize: "1.2em",
                fontWeight: "bold",
              }}
            >
              Pick
            </span>{" "}
            button
          </h2>
          <div className="action-buttons">
            <button
              className="action-button pick"
              onClick={() => handleSubmit("pick")}
            >
              Pick
            </button>
            <button
              className="action-button drop"
              onClick={() => handleSubmit("drop")}
            >
              Drop
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmitFeedback} className="feedback-form">
          <h2 style={{ color: "rgb(255, 149, 0)", marginBottom: "0px" }}>
            I'd love to hear
            <br />
            your thoughts!
          </h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Please share why you chose to drop and how I could improve...and your company name too"
            className="feedback-textarea"
            required
          />
          <div className="feedback-buttons">
            <button type="submit" className="action-button pick">
              Send Feedback
            </button>
            <button
              type="button"
              className="action-button drop"
              onClick={handleSkip}
            >
              Skip
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EmailForm;
