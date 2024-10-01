import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./components/createcheck"; // Importe o componente Create
import Home from "./components/inicialpage/Home"; // Importe o componente Home

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
