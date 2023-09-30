import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import QuestionSet from "../../components/QuestionSet";
import ola from "../../images/ola.jpg";
import { ReactComponent as HomeOutlined } from "../../svg/HomeOutlined.svg";
import { ReactComponent as HomeFilled } from "../../svg/HomeFilled.svg";
import { useNavigate } from "react-router-dom";
import { fetchQuestions } from "../../features/questionSlice";
import { useDispatch } from "react-redux";

function Questions() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [selected, setSelected] = useState("tab1");

  useEffect(() => {
   dispatch(fetchQuestions())
  }, [dispatch]);

  const handleHomeBtnClick = () => {
    setSelected("tab1");
  };

  const handleAddExam = () => {
    setSelected("tab2");

    navigate("/questions/exams-questions");
  };

  const handleAddQuiz = () => {
    setSelected("tab3");

    navigate("/questions/quiz-questions");
  };

  return (
    <Box display="flex" flexDirection="column" padding="20px">
      <Box
        display="flex"
        alignItems="center"
        borderRadius="30px"
        bgcolor="#1494A6"
        height="2.5rem"
        width="max-content"
        paddingLeft="2px"
        paddingRight="2px"
        mb="30px"
        position="sticky"
        top="60px"
      >
        <Box display="flex">
          <Button
            variant="none"
            onClick={handleHomeBtnClick}
            style={{
              backgroundColor: selected === "tab1" ? "white" : undefined,
              borderRadius: "20px",
            }}
          >
            {selected === "tab1" ? <HomeFilled /> : <HomeOutlined />}
          </Button>

          <Button
            variant="none"
            style={{
              textTransform: "capitalize",
              color: selected === "tab2" ? "black" : "white",
              backgroundColor: selected === "tab2" ? "white" : undefined,
              borderRadius: "20px",
            }}
            onClick={handleAddExam}
          >
            <p style={{ margin: "0px", fontFamily: "Rubik" }}>Add question</p>
          </Button>

          <Button
            variant="none"
            style={{
              textTransform: "capitalize",
              color: selected === "tab3" ? "black" : "white",
              backgroundColor: selected === "tab3" ? "white" : undefined,
              borderRadius: "20px",
            }}
            onClick={handleAddQuiz}
          >
            <p style={{ margin: "0px", fontFamily: "Rubik" }}>Add quiz</p>
          </Button>
        </Box>
      </Box>

      <h3 style={{ margin: "0px" }}>Previous Questions</h3>
      <QuestionSet
          title="English"
          subtitle="jhs 2"
          duration="1:30:00"
          days="2 hours ago"
          image={ola}
        />
      <Box>
        <h3 style={{ margin: "0px", marginTop: "20px" }}>New Questions</h3>
        <QuestionSet
          title="English"
          subtitle="jhs 2"
          duration="1:30:00"
          days="2 hours ago"
          image={ola}
        />
      </Box>
    </Box>
  );
}

export default Questions;
