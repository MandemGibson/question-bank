import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectQuestion } from "../features/questionSlice";
import { useParams } from "react-router";
import { Box } from "@mui/material";

function QuesetionDetails() {
  const { id } = useParams();
  const questions = useSelector(selectQuestion);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const foundQuestion = questions.find((q) => q.id === id);
    setQuestion(foundQuestion);
  }, [questions, id]);

  if (!question) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100vh"
      >
        <p>Loading...</p>
      </Box>
    );
  }

  return (
    <Box
      mx="150px"
      my="20px"
      height="100vh"
      bgcolor="#fff"
      borderRadius="0.625rem"
      p="20px"
      fontFamily="Rubik"
    >
      <ol>
        {question.questions.map((q) => {
          return (
            <li key={q.id} style={{ marginBottom: "20px" }}>
              {q.question}
              <Box>
                <ol type="a">
                  {q.answerChoices.map((choice) => {
                    return (
                      <li
                        key={choice.id}
                        style={{ marginTop: "5px", fontSize: "14px" }}
                      >
                        {choice.choice}
                      </li>
                    );
                  })}
                </ol>
              </Box>
            </li>
          );
        })}
      </ol>
    </Box>
  );
}

export default QuesetionDetails;
