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
// import HeroSlider, { Slide } from "hero-slider";
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

  return (
    <Box display="flex" flexDirection="column" m="20px">
      <Box
        width="100%"
        bgcolor="white"
        height="10rem"
        borderRadius="0.625rem"
        boxShadow={boxShadow}
        // sx={{ objectFit: "contain" }}
      >
        {/* <img src={motivation} alt="Motivational Quotes" height="100%" width="100%"/> */}
        {/* <HeroSlider
          height="100%"
          width="100%"
          settings={{debug: true}}
        >
          {images.map((image, index) => {
            return (
              <Slide
                key={index}
                background={{
                  backgroundImageSrc: image,
                }}
              />
            );
          })}
        </HeroSlider> */}
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
          {filteredQuestions.length !== 0 ? (
            filteredQuestions.map((question) => {
              return (
                question.categoryId ===
                  "f24df200-8f37-40e5-836b-21cbb7f42636" && (
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
            <p>No new exam posted</p>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ExamsTab;
