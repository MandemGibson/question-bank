import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectQuestion } from "../features/questionSlice";
import { useParams } from "react-router";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import FlagIcon from "@mui/icons-material/Flag";

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";

function OpenQuiz() {
  const { id } = useParams();
  const questions = useSelector(selectQuestion);
  const [quiz, setQuiz] = useState(null);
  const [flagged, setFlagged] = useState(false);

  useEffect(() => {
    const foundQuiz = questions.find((q) => q.id === Number(id));
    setQuiz(foundQuiz);
  }, [questions, id]);

  if (!quiz) {
    return <p>Loading...</p>;
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
          <Box my="10px" style={{ color: "#6b6a6a" }}>
            <IconButton onClick={() => setFlagged(!flagged)}>
              {!flagged ? <FlagOutlinedIcon /> : <FlagIcon />}
            </IconButton>
          </Box>
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
        <ol>
          <li>
            <Box fontFamily="Rubik" fontWeight="600">
              {quiz.question}
              <Box mt={1}>
                {quiz.answerChoices.map((choice) => {
                  return (
                    <Box key={choice.id} display="flex" alignItems="center">
                      <input
                        key={choice.id}
                        type="radio"
                        style={{ marginBottom: "5px" }}
                      />
                      <p style={{ margin: "0px 0px 5px 5px" }}>
                        {choice.choice}
                      </p>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </li>
        </ol>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Button
            variant="none"
            style={{
              textTransform: "none",
              backgroundColor: "transparent",
              textDecoration: "underline",
              color: "#83eaf8",
            }}
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
            // onClick={onClick}
          >
            <p style={{ margin: "0px" }}>Submit</p>
          </Button>
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
            <Box
              display="flex"
              bgcolor="#83eaf8"
              borderRadius="0.625rem"
              width="3rem"
              height="3rem"
              alignItems="center"
              justifyContent="center"
              mb="12px"
              mr="12px"
            >
              {quiz.id}
            </Box>
          </Box>
          <Box></Box>
        </Box>
      </Box>
    </Box>
  );
}

export default OpenQuiz;
