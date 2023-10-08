import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectQuestion } from "../features/questionSlice";
import { useParams } from "react-router";

function OpenQuiz() {
  const { id } = useParams();
  const questions = useSelector(selectQuestion);
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const foundQuiz = questions.find((q) => q.id === Number(id));
    setQuiz(foundQuiz);
  }, [questions, id]);

  if (!quiz) {
    return <p>Loading...</p>;
  }
  return <Box>{quiz.question}</Box>;
}

export default OpenQuiz;
