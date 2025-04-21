import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/Home";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
};

export default App;
