import React, { useEffect } from "react";
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
import QuesetionDetails from "./components/QuestionDetails";
import AuthPage from "./auth/AuthPage";
import { useDispatch } from "react-redux";
import { fetchQuestions } from "./features/questionSlice";
import StudentDashBoard from "./StudentSide/scenes/dashboard";
import StuSidebar from "./StudentSide/scenes/global/StuSidebar";
import StuTopbar from "./StudentSide/scenes/global/StuTopbar";
import QuizTab from "./StudentSide/scenes/quiz tab";
import ExamsTab from "./StudentSide/scenes/exams tab";
import Grades from "./StudentSide/scenes/grades";
import OpenQuiz from "./components/OpenQuiz";

const isLoggedIn = true;
const isTeacher = false;
const isStudent = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  });
  return (
    <div className="app">
      {isLoggedIn && isTeacher ? (
        <>
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/questions/:id" element={<QuesetionDetails />} />
              <Route
                path="/questions/exams-questions"
                element={<AddQuestion />}
              />
              <Route path="/questions/quiz-questions" element={<AddQuiz />} />
              <Route path="/results" element={<Results />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/feedback" element={<Feedback />} />
            </Routes>
          </main>
        </>
      ) : isLoggedIn && isStudent ? (
        <>
          <StuSidebar />
          <main className="content">
            <StuTopbar />
            <Routes>
              <Route exact path="/" element={<StudentDashBoard />} />
              <Route exact path="/quiz-tab" element={<QuizTab />} />
              <Route exact path="/quiz-tab/:id" element={<OpenQuiz />} />
              <Route exact path="/exams-tab" element={<ExamsTab />} />
              <Route exact path="/grades" element={<Grades />} />
              <Route exact path="/guide" element={<StudentDashBoard />} />
              <Route exact path="/feedback" element={<StudentDashBoard />} />
            </Routes>
          </main>
        </>
      ) : (
        <AuthPage />
      )}
    </div>
  );
}

export default App;
