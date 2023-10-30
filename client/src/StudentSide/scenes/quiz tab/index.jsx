import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import QuizQuest from "../../../components/QuizQuest";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestions,
  selectQuestion,
} from "../../../features/questionSlice";
import { useNavigate } from "react-router";

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";

function QuizTab() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questions = useSelector(selectQuestion);
  const [openQuiz, setOpenQuiz] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleAttempt = (questionId) => {
    setOpenQuiz(!openQuiz);

    navigate(`/quiz-tab/${questionId}`);
  };
  return (
    <Box display="flex" flexDirection="column" m="20px">
      <Box
        width="100%"
        bgcolor="white"
        height="8rem"
        borderRadius="0.625rem"
        boxShadow={boxShadow}
      ></Box>
      <Box
        display="flex"
        flexDirection="column"
        bgcolor="#fff"
        boxShadow={boxShadow}
        mt="20px"
        borderRadius="0.625rem"
        height="min-content"
        minHeight="20rem"
      >
        <Box p={2}>
          <Box
            display="flex"
            mb="20px"
            fontFamily="Rubik"
            fontSize="15px"
            fontWeight="bold"
            justifyContent="space-between"
            width="78%"
          >
            <p style={{ margin: "0px" }}>Title</p>
            <p style={{ margin: "0px 5.2em 0px 0px" }}>Deadline</p>
            <p style={{ margin: "0px" }}>Duration</p>
          </Box>
          {questions && questions.length !== 0 ? (
            questions.map((question) => {
              return (
                question.categoryId === "dc519019-c204-4e12-9a25-1df6b5604cf9" && (
                  <QuizQuest
                    key={question.id}
                    title={question.title}
                    deadline={question.createdAt.split("T")[0]}
                    duration={question.timeLimit}
                    onClick={() => handleAttempt(question.id)}
                  />
                )
              );
            })
          ) : (
            <p>No new quiz posted</p>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default QuizTab;
