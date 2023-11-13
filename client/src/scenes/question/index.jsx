import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import QuestionSet from "../../components/QuestionSet";
import ola from "../../images/ola.jpg";
import { ReactComponent as HomeOutlined } from "../../svg/HomeOutlined.svg";
import { ReactComponent as HomeFilled } from "../../svg/HomeFilled.svg";
import { useNavigate } from "react-router-dom";
import { fetchQuestions, selectQuestion } from "../../features/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function Questions() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestion);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("tab1");

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleHomeBtnClick = () => {
    setSelected("tab1");
  };

  const handleAddExam = () => {
    setSelected("tab2");

    navigate("/questions/exams-questions");
  };

  const handleAddQuiz = () => {
    setSelected("tab3");

    navigate("/questions/quiz-questions");
  };

  const handleQuestionClick = (questionId) => {
    navigate(`/questions/${questionId}`);
  };

  const filteredQuestions = questions.filter(
    (question) => question.staffId === user.user.id
  );

  const newQuestions = filteredQuestions.filter((question)=> question.isCompleted === false)

  const completedQuestions = filteredQuestions.filter((question)=> question.isCompleted ===true)

  return (
    <Box display="flex" flexDirection="column" padding="20px">
      <Box
        display="flex"
        alignItems="center"
        borderRadius="30px"
        bgcolor="#1494A6"
        height="2.5rem"
        width="max-content"
        paddingLeft="2px"
        paddingRight="2px"
        mb="30px"
        position="sticky"
        top="60px"
        zIndex={999}
      >
        <Box display="flex">
          <Button
            variant="none"
            onClick={handleHomeBtnClick}
            style={{
              backgroundColor: selected === "tab1" ? "white" : undefined,
              borderRadius: "20px",
            }}
          >
            {selected === "tab1" ? <HomeFilled /> : <HomeOutlined />}
          </Button>

          <Button
            variant="none"
            style={{
              textTransform: "capitalize",
              color: selected === "tab2" ? "black" : "white",
              backgroundColor: selected === "tab2" ? "white" : undefined,
              borderRadius: "20px",
            }}
            onClick={handleAddExam}
          >
            <p style={{ margin: "0px", fontFamily: "Rubik" }}>Add exam</p>
          </Button>

          <Button
            variant="none"
            style={{
              textTransform: "capitalize",
              color: selected === "tab3" ? "black" : "white",
              backgroundColor: selected === "tab3" ? "white" : undefined,
              borderRadius: "20px",
            }}
            onClick={handleAddQuiz}
          >
            <p style={{ margin: "0px", fontFamily: "Rubik" }}>Add quiz</p>
          </Button>
        </Box>
      </Box>

      <h3 style={{ margin: "0px" }}>Completed Questions</h3>
      {completedQuestions.length === 0 ? (
          <p
            style={{
              margin: "30px",
              fontStyle: "italic",
              fontFamily: "Amaranth",
            }}
          >
            No new question posted
          </p>
        ) : (
          completedQuestions.map((question) => (
            <QuestionSet
              key={question.id}
              questionId={question.id}
              title={question.title}
              subtitle={question.level.name}
              duration={question.timeLimit}
              days={question.createdAt.split("T")[0]}
              image={ola}
              onClick={() => handleQuestionClick(question.id)}
            />
          ))
        )}

      <Box>
        <h3 style={{ margin: "0px", marginTop: "20px" }}>New Questions</h3>
        {newQuestions.length === 0 ? (
          <p
            style={{
              margin: "30px",
              fontStyle: "italic",
              fontFamily: "Amaranth",
            }}
          >
            No new question posted
          </p>
        ) : (
          newQuestions.map((question) => (
            <QuestionSet
              key={question.id}
              questionId={question.id}
              title={question.title}
              subtitle={question.level.name}
              duration={question.timeLimit}
              days={question.createdAt.split("T")[0]}
              image={ola}
              onClick={() => handleQuestionClick(question.id)}
            />
          ))
        )}
      </Box>
    </Box>
  );
}

export default Questions;
