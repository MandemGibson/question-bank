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
import Carousel from "../../../components/Carousel";
import motivation from "../../../images/motivation.jpg";
import motivation1 from "../../../images/motivation1.jpg";
import motivation2 from "../../../images/motivation2.png";
import motivation3 from "../../../images/motivation3.png";
import motivation4 from "../../../images/motivation4.jpg";

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";

const images = [motivation, motivation1, motivation2, motivation3, motivation4];

function QuizTab() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser)
  const questions = useSelector(selectQuestion);
  const [openQuiz, setOpenQuiz] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleAttempt = (questionId) => {
    setOpenQuiz(!openQuiz);

    navigate(`/quiz-tab/${questionId}`);
  };

  const filteredQuestions = questions.filter((question) => question.level.name === user.user.level.name)

  return (
    <Box display="flex" flexDirection="column" m="20px">
      <Box
        width="100%"
        bgcolor="white"
        height="10rem"
        borderRadius="0.625rem"
        boxShadow={boxShadow}
      >
        <Carousel images={images}/>
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
          { filteredQuestions.length !== 0 ? (
            filteredQuestions.map((question) => {
              return (
                question.categoryId === "c021b0c7-6ed2-47d0-beed-748f5061ed0b" && (
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
