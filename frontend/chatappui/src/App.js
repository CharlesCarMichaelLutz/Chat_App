import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chatroom from "./components/Chatroom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/chatroom" element={<Chatroom />} />
      </Routes>
    </Router>
  );
}

export default App;
