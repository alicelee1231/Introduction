import React, { useState, useEffect } from "react";
import "./Angel.css";

interface AngelProps {
  size?: number;
}

const Angel: React.FC<AngelProps> = ({ size = 50 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const moveAngel = () => {
      setPosition((prev) => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) return prev;

        const speed = 15;
        const vx = (dx / distance) * speed;
        const vy = (dy / distance) * speed;

        return {
          x: prev.x + vx,
          y: prev.y + vy,
        };
      });
    };

    const animationFrame = requestAnimationFrame(moveAngel);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition]);

  return (
    <div
      className="angel"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div className="angel-ring"></div>
      <div className="angel-head"></div>
      <div className="angel-body"></div>
      <div className="angel-wings">
        <div className="wing left"></div>
        <div className="wing right"></div>
      </div>
      <div className="angel-halo"></div>
    </div>
  );
};

export default Angel;
