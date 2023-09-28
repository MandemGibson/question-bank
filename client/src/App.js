import React from "react";
import "./App.css";
import Sidebar from "./scenes/global/Sidebar";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Questions from "./scenes/question";
import Results from "./scenes/result";
import Statistics from "./scenes/statistics";
import Guide from "./scenes/guide";
import Feedback from "./scenes/feedback";
import AddQuestion from "./scenes/question/setquestion";
import AddQuiz from "./scenes/question/addquiz";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/questions/exams-questions" element={<AddQuestion />} />
          <Route path="/questions/quiz-questions" element={<AddQuiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
