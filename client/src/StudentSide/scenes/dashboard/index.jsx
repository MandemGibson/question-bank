import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import "../../../cssModules/StuDashboard.css";
import CourseBox from "../../../components/CourseBox";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import {
  fetchQuestions,
  selectQuestion,
} from "../../../features/questionSlice";

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";

function StudentDashBoard() {
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestion);
  const user = useSelector(selectUser);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const filteredQuestions = questions.filter(
    (question) =>
      question.level.name === user.user.level.name &&
      question.isDone
  );

  const AccessedCourses = filteredQuestions?.map((question, index) => ({
    id: index,
    title: question.title,
    subtitle: "First semester",
  }));

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(AccessedCourses.length - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < AccessedCourses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <Box
      display="grid"
      mx="4rem"
      my="2rem"
      sx={{ placeContent: "center" }}
      gridTemplateColumns={"1fr"}
    >
      <Box display="flex" flexDirection="column">
        <Box
          borderRadius="0.625rem"
          bgcolor="white"
          height="10rem"
          width="100%"
          display="flex"
          boxShadow={boxShadow}
        >
          <Box padding="10px" fontFamily="Rubik" fontWeight="600">
            <p style={{ margin: "0px" }}>Latest Announcement</p>
          </Box>
          {
            <p style={{ margin: "0px", alignSelf: "center" }}>
              No new quiz or exams posted
            </p>
          }
        </Box>
        <Box
          mt="20px"
          bgcolor="white"
          borderRadius="0.625rem"
          height="min-content"
          minHeight="20rem"
          boxShadow={boxShadow}
          padding="10px"
          position="relative"
        >
          <p style={{ margin: "0px", fontFamily: "Rubik", fontWeight: "600" }}>
            Recently Accessed Subjects
          </p>
          <Box display="flex">
            <button
              className="img-slider-btn"
              style={{ left: 0 }}
              onClick={handlePrev}
            >
              <ArrowBackIosRoundedIcon />
            </button>
            <button
              className="img-slider-btn"
              style={{ right: 0 }}
              onClick={handleNext}
            >
              <ArrowForwardIosRoundedIcon />
            </button>
          </Box>
          <Box
            display="flex"
            height="100%"
            alignItems="center"
            justifyContent="center"
            // width="100%"
            position="absolute"
            left="32%"
          >
            {AccessedCourses.map((courses, index) => {
              return (
                <Box
                  key={courses.id}
                  sx={{
                    transform: `translateX(0%)`,
                    transition: "transform 0.3s ease-in-out",
                    width: "100%",
                  }}
                >
                  {index === currentIndex && (
                    <CourseBox
                      key={index}
                      title={courses.title}
                      subtitle={courses.subtitle}
                      image={courses.image}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      {/* <Box
        bgcolor="white"
        borderRadius="0.625rem"
        width="30%"
        boxShadow={boxShadow}
        minHeight="15rem"
        height="min-content"
      >
        <Box padding="10px">
          <p style={{ margin: "0px", fontFamily: "Rubik", fontWeight: "600" }}>
            Online Users
          </p>
          <ul>
            {
              onlineUsers.filter((user)=> user.valid).map((users) => {
                return <li key={users.id}>{users.userId}</li>
              })
            }
            
          </ul>
        </Box>
      </Box> */}
    </Box>
  );
}

export default StudentDashBoard;
