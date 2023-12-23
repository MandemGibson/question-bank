import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectQuestion } from "../features/questionSlice";
import { selectUser } from "../features/userSlice";
import { useNavigate, useParams } from "react-router";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import "../index.css";
import axios from "axios";

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";

function OpenQuestion() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const { id } = useParams();
  const questions = useSelector(selectQuestion);
  const [quiz, setQuiz] = useState(null);
  const [flagged, setFlagged] = useState(
    Array(quiz?.questions.length).fill(false)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState(
    Array(quiz?.questions.length).fill("")
  );

  useEffect(() => {
    const foundQuestion = questions.find((q) => q.id === id);
    setQuiz(foundQuestion);
    console.log(quiz);
  }, [questions, id, quiz]);

  useEffect(() => {
    if (quiz) {
      const totalSeconds = quiz.timeLimit * 60;
      let remainingSeconds = totalSeconds;
      const hours = Math.floor(remainingSeconds / 3600);
      remainingSeconds %= 3600;
      const remainingMinutes = Math.floor(remainingSeconds / 60);
      remainingSeconds %= 60;

      setHour(hours);
      setMinute(remainingMinutes);
      setSeconds(remainingSeconds);
    }
  }, [quiz]);

  useEffect(() => {
    let timer;
    if (hour > 0 || minute > 0 || seconds > 0) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minute > 0) {
          setMinute(minute - 1);
          setSeconds(59);
        } else if (hour > 0) {
          setHour(hour - 1);
          setMinute(59);
          setSeconds(59);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [hour, minute, seconds]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    console.log(selectedChoices);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleClear = () => {
    const newSelectedChoices = [...selectedChoices];
    newSelectedChoices[currentIndex] = "";
    setSelectedChoices(newSelectedChoices);
  };

  // const calculateResult = () => {};

  useEffect(() => {
    console.log(score);
  }, [score]);

  const handleSubmit = async () => {
    let result = 0;

    if (quiz) {
      quiz.questions.forEach((question, index) => {
        if (
          selectedChoices[index] ===
          question.answerChoices.find((choice) => choice.isCorrect).choice
        ) {
          result += 1;
        }
      });
    }
    setScore((result / quiz.questions.length) * 100);

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.post(`${apiUrl}/results`, {
        result: (result / quiz.questions.length) * 100,
        categoryId: quiz.categoryId,
        studentId: user?.user.id,
        title: quiz.title,
      });
    } catch (error) {
      console.error("Error making requesting: ", error);
    }
    if (quiz.categoryId === "7eb6a67a-a9f7-448f-ae4c-e2450e7f39db") {
      navigate("/exams-tab");
    } else {
      navigate("/quiz-tab");
    }

    const questionId = quiz.questions[currentIndex].id;

    const data = {
      topicId: id,
      isCompleted: true,
    };

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.patch(`${apiUrl}/questions/${questionId}`, data);
    } catch (error) {
      console.error("Error updating question", error);
    }
  };

  const handleFlagged = async (index) => {
    const newFlagged = [...flagged];
    newFlagged[index] = !newFlagged[index];
    setFlagged(newFlagged);

    const questionId = quiz.questions[index].id;

    const data = {
      topicId: id,
      isFlagged: newFlagged[index],
    };

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.patch(`${apiUrl}/questions/${questionId}`, data);
    } catch (error) {
      console.error("Error updating question", error);
    }
  };

  if (!quiz) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Box position="relative" className="spinner" />
      </Box>
    );
  }

  return (
    <Box display="flex" m="20px" justifyContent="space-between">
      <Box
        bgcolor="white"
        flex="0.2"
        boxShadow={boxShadow}
        height="min-content"
        position="sticky"
        top="20px"
      >
        <Box p={1}>
          <p
            style={{
              margin: "0px",
              fontFamily: "Rubik",
              color: "#6B6A6A",
              fontWeight: "500",
            }}
          >
            Question is inappropriate?
          </p>
          <p
            style={{
              margin: "0px",
              fontFamily: "Rubik",
              color: "#6B6A6A",
              fontWeight: "500",
            }}
          >
            Flag it
          </p>
          {quiz?.questions?.map((question, index) => {
            return (
              <Box
                key={question.id}
                my="10px"
                style={{ color: "#6b6a6a" }}
                display={index === currentIndex ? "block" : "none"}
              >
                <IconButton onClick={() => handleFlagged(index)}>
                  {!flagged[index] ? <FlagOutlinedIcon /> : <FlagIcon />}
                </IconButton>
              </Box>
            );
          })}
          <p
            style={{
              margin: "0px",
              fontFamily: "Rubik",
              color: "#6B6A6A",
              fontWeight: "500",
            }}
          >
            The question carries:
          </p>
          <p
            style={{
              margin: "0px",
              fontFamily: "Rubik",
              color: "#6B6A6A",
              fontWeight: "500",
            }}
          >
            1 mark
          </p>
        </Box>
      </Box>
      <Box
        bgcolor="white"
        flex="0.5"
        boxShadow={boxShadow}
        borderRadius="0.625rem"
        height="min-content"
        position="sticky"
        top="20px"
      >
        {quiz.questions?.map((question, index) => {
          return (
            <ol key={question.id}>
              <Box>
                <li
                  style={{
                    fontFamily: "Rubik",
                    fontWeight: "600",
                    display: index === currentIndex ? "block" : "none",
                  }}
                >
                  {index + 1}
                  {". "}
                  {question.question}
                  <Box mt={1}>
                    {question.answerChoices?.map((choice) => {
                      return (
                        <Box key={choice.id} display="flex" alignItems="center">
                          <input
                            key={choice.id}
                            name={`${choice} && ${question.id}`}
                            checked={selectedChoices[index] === choice.choice}
                            type="radio"
                            value={choice.choice}
                            onChange={() => {
                              const newSelectedChoices = [...selectedChoices];
                              newSelectedChoices[index] = choice.choice;
                              setSelectedChoices(newSelectedChoices);
                            }}
                            style={{ marginBottom: "5px" }}
                          />
                          <p style={{ margin: "0px 0px 5px 5px" }}>
                            {choice.choice}
                          </p>
                        </Box>
                      );
                    })}
                  </Box>
                </li>
              </Box>
            </ol>
          );
        })}
        <Box display="flex" justifyContent="space-between" p={2}>
          <Button
            variant="none"
            style={{
              textTransform: "none",
              backgroundColor: "transparent",
              textDecoration: "underline",
              color: "#83eaf8",
            }}
            onClick={handleClear}
          >
            <p
              style={{
                margin: "0px",
                fontFamily: "Rubik",
                fontWeight: "500",
              }}
            >
              Clear my choice
            </p>
          </Button>
          <Box display="flex">
            {currentIndex !== 0 && (
              <Button
                variant="none"
                style={{
                  textTransform: "capitalize",
                  borderRadius: "1rem",
                  backgroundColor: "#00B1C9",
                  color: "#fff",
                  fontFamily: "Rubik",
                  fontWeight: "bold",
                  width: "7rem",
                  height: "2rem",
                  marginRight: "5px",
                }}
                onClick={handlePrev}
              >
                <p style={{ margin: "0px" }}>Previous</p>
              </Button>
            )}
            {currentIndex < quiz.questions.length - 1 ? (
              <Button
                variant="none"
                style={{
                  textTransform: "capitalize",
                  borderRadius: "1rem",
                  backgroundColor: "#00B1C9",
                  color: "#fff",
                  fontFamily: "Rubik",
                  fontWeight: "bold",
                  width: "7rem",
                  height: "2rem",
                }}
                onClick={handleNext}
              >
                <p style={{ margin: "0px" }}>Next</p>
              </Button>
            ) : (
              <Button
                variant="none"
                style={{
                  textTransform: "capitalize",
                  borderRadius: "1rem",
                  backgroundColor: "#00B1C9",
                  color: "#fff",
                  fontFamily: "Rubik",
                  fontWeight: "bold",
                  width: "7rem",
                  height: "2rem",
                }}
                onClick={handleSubmit}
              >
                <p style={{ margin: "0px" }}>Submit</p>
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        flex="0.25"
        bgcolor="white"
        boxShadow={boxShadow}
        minHeight="100vh"
        height="min-content"
      >
        <Box p="20px" display="flex" flexDirection="column" width="100%">
          <Box
            display="flex"
            justifyContent="normal"
            whiteSpace="nowrap"
            flexWrap="wrap"
            width="100%"
          >
            {quiz.questions.map((_, index) => {
              return (
                <Box
                  key={index}
                  display="flex"
                  bgcolor="#83eaf8"
                  borderRadius="0.625rem"
                  width="3rem"
                  height="3rem"
                  alignItems="center"
                  justifyContent="center"
                  mb="12px"
                  mr="12px"
                  color="white"
                  fontFamily="Rubik"
                >
                  {index + 1}
                </Box>
              );
            })}
          </Box>
          <Box mt="2rem">
            <p
              style={{
                margin: "0px",
                fontFamily: "Rubik",
                fontWeight: "600",
                fontSize: "15px",
              }}
            >
              Time Remaining
            </p>
            <Box
              mt="10px"
              bgcolor="#FF0000"
              width="9rem"
              height="2rem"
              borderRadius="0.625rem"
              fontFamily="Rubik"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {hour < 10 ? "0" + hour : hour}:
              {minute < 10 ? "0" + minute : minute}:
              {seconds < 10 ? "0" + seconds : seconds}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default OpenQuestion;
