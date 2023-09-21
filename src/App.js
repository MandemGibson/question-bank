import React from "react";
import "./App.css";
import Sidebar from "./scenes/global/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="app__sidebar">
          <Sidebar />
        </div>
        <div className="app__body">
          <Topbar />
          <div className="app__content"></div>
        </div>
      </div>
    </Router>
  );
}

export default App;
