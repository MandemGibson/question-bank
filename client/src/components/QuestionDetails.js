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
    const foundQuestion = questions.find((q) => q.id === Number(id));
    setQuestion(foundQuestion);
  }, [questions, id]);

  if (!question) {
    return <p>Loading...</p>;
  }

  return (
    <Box
      mx="150px"
      my="20px"
      height="100vh"
      bgcolor="#fff"
      borderRadius="0.625rem"
      p="20px"
    >
      {question.question}
    </Box>
  );
}

export default QuesetionDetails;
