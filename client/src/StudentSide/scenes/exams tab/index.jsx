import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import QuizQuest from "../../../components/QuizQuest";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestions,
  selectQuestion,
} from "../../../features/questionSlice";
import { useNavigate } from "react-router";
import { selectUser } from "../../../features/userSlice";
import motivation from "../../../images/motivation.jpg";
import motivation1 from "../../../images/motivation1.jpg";
import motivation2 from "../../../images/motivation2.png";
import motivation3 from "../../../images/motivation3.png";
import motivation4 from "../../../images/motivation4.jpg";
import Carousel from "../../../components/Carousel";

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";

const images = [motivation, motivation1, motivation2, motivation3, motivation4];

function ExamsTab() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const questions = useSelector(selectQuestion);
  const [openExam, setOpenExam] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleAttempt = (questionId) => {
    setOpenExam(!openExam);

    navigate(`/exams-tab/${questionId}`);
  };

  const filteredQuestions = questions.filter(
    (question) => question.level.name === user.user.level.name
  );

  const exams = filteredQuestions.filter(
    (question) => question.categoryId === "68f3fa4c-356d-406d-af20-e0c3a5eb3cb1"
  );

  return (
    <Box display="flex" flexDirection="column" m="20px">
      <Box
        width="100%"
        bgcolor="white"
        height="10rem"
        borderRadius="0.625rem"
        boxShadow={boxShadow}
      >
        <Carousel images={images} />
      </Box>
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
        <Box p={2} display="flex" flexDirection="column">
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
          {exams.length !== 0 ? (
            exams.map((question) => {
              return (
                <QuizQuest
                  key={question.id}
                  title={question.title}
                  buttonText={
                    question.isCompleted === true ? "Done" : "Attempt Exams"
                  }
                  color={question.isCompleted === true ? "gray" : "#83eaf8"}
                  disabled={question.isCompleted}
                  deadline={question.createdAt.split("T")[0]}
                  duration={question.timeLimit}
                  onClick={() => handleAttempt(question.id)}
                />
              );
            })
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              minHeight="100%"
              flexDirection="column"
              fontFamily="Rubik"
              fontWeight="600"
              fontSize="1.5rem"
              color="#6b6a6a"
            >
              <p
                style={{
                  margin: "0px",
                }}
              >
                No new exam posted
              </p>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ExamsTab;
