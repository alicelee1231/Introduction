import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import "./App.css";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
};

export default App;
