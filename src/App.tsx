import React from "react";
import { Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </div>
  );
};

export default App;
