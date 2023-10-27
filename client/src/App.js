import React from "react";
import "./App.css";
import Sidebar from "./scenes/global/Sidebar";
import { Routes, Route, useLocation } from "react-router-dom";
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
import { useSelector } from "react-redux";
// import { fetchQuestions } from "./features/questionSlice";
import StudentDashBoard from "./StudentSide/scenes/dashboard";
import StuSidebar from "./StudentSide/scenes/global/StuSidebar";
import StuTopbar from "./StudentSide/scenes/global/StuTopbar";
import QuizTab from "./StudentSide/scenes/quiz tab";
import ExamsTab from "./StudentSide/scenes/exams tab";
import Grades from "./StudentSide/scenes/grades";
import OpenQuestion from "./components/OpenQuestion";
import AdminDashboard from "./AdminPage/scenes/dashboard";
import AdminTopbar from "./AdminPage/scenes/global/AdminTopbar";
import AdminSidebar from "./AdminPage/scenes/global/AdminSidebar";
import { selectUser } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  const location = useLocation();

  const isOpenQuiz = /^\/quiz-tab\/\d+|^\/exams-tab\/\d+/.test(
    location.pathname
  );

  return (
    <div className="app">
      {!user ? (
        <AuthPage />
      ) : user?.user.role === 3921 ? (
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
      ) : user?.user.role === 6631 ? (
        <>
          {isOpenQuiz ? null : <StuSidebar />}
          <main className="content">
            {isOpenQuiz ? null : <StuTopbar />}
            <Routes>
              <Route exact path="/" element={<StudentDashBoard />} />
              <Route exact path="/quiz-tab" element={<QuizTab />} />
              <Route exact path="/quiz-tab/:id" element={<OpenQuestion />} />
              <Route exact path="/exams-tab" element={<ExamsTab />} />
              <Route exact path="/exams-tab/:id" element={<OpenQuestion />} />
              <Route exact path="/grades" element={<Grades />} />
              <Route exact path="/guide" element={<Guide />} />
              <Route exact path="/feedback" element={<Feedback />} />
            </Routes>
          </main>
        </>
      ) : (
        user?.user.role === 9291 && (
          <>
            <AdminSidebar />
            <main className="content">
              <AdminTopbar />
              <Routes>
                <Route exact path="/" element={<AdminDashboard />} />
                <Route exact path="/staff" element={<AdminDashboard />} />
                <Route exact path="/students" element={<AdminDashboard />} />
                <Route exact path="/statistics" element={<AdminDashboard />} />
                <Route exact path="/guide" element={<AdminDashboard />} />
                <Route exact path="/feedback" element={<Feedback />} />
              </Routes>
            </main>
          </>
        )
      )}
    </div>
  );
}

export default App;
