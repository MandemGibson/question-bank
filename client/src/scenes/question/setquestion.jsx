import { Box, Button, Fab, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as HomeOutlined } from "../../svg/HomeOutlined.svg";
import { ReactComponent as HomeFilled } from "../../svg/HomeFilled.svg";
import { Close } from "@mui/icons-material";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { selectQuestion } from "../../features/questionSlice";

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";

function AddQuestion() {
  // const questions = useSelector(selectQuestion)
  const navigate = useNavigate();
  const [selected, setSelected] = useState("tab2");
  const [question, setQuestion] = useState(() => {
    const localValue = localStorage.getItem("question");
    if (localValue === null) {
      return "";
    }

    return JSON.parse(localValue);
  });

  const [answerChoices, setAnswerChoices] = useState(() => {
    const localValue = localStorage.getItem("answerChoices");
    if (localValue === null) {
      return ["", "", "", ""];
    }

    return JSON.parse(localValue);
  });

  const [image, setImage] = useState(() => {
    const localValue = localStorage.getItem("image");
    if (localValue === null) {
      return null;
    }

    return JSON.parse(localValue);
  });

  const [filename, setFilename] = useState("No image selected");
  const [correctAnswer, setCorrectAnswer] = useState(() => {
    const localValue = localStorage.getItem("correctAnswer");
    if (localValue === null) {
      return "";
    }

    return JSON.parse(localValue);
  });

  const [questionList, setQuestionList] = useState(() => {
    const localValue = localStorage.getItem("questionList");
    if (localValue === null) {
      return [];
    }

    return JSON.parse(localValue).map((question) => ({
      ...question,
      result: null,
    }));
  });

  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    localStorage.setItem("image", JSON.stringify(image));
    localStorage.setItem("question", JSON.stringify(question));
    localStorage.setItem("answerChoices", JSON.stringify(answerChoices));
    localStorage.setItem("correctAnswer", JSON.stringify(correctAnswer));
    localStorage.setItem("questionList", JSON.stringify(questionList));
  }, [image, question, answerChoices, correctAnswer, questionList]);

  const handleAnswerChange = (index, e) => {
    const answerChoiceCopy = [...answerChoices];
    answerChoiceCopy[index] = e.target.value;
    setAnswerChoices(answerChoiceCopy);
  };

  const handleHomeBtnClick = () => {
    setSelected("tab1");

    navigate("/questions");
  };

  const handleAddExam = () => {
    setSelected("tab2");
  };

  const handleAddQuiz = () => {
    setSelected("tab3");

    navigate("/questions/quiz-questions");
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleCorrectAnswer = (e) => {
    setCorrectAnswer(e.target.value);
  };

  const handleSelectedAnswer = (questionIndex) => {
    const updatedQuestionList = [...questionList];
    const eachQuestion = updatedQuestionList[questionIndex];

    if (selectedAnswer === eachQuestion.correctAnswer) {
      eachQuestion.result = true;
    } else {
      eachQuestion.result = false;
    }

    setQuestionList(updatedQuestionList);
  };

  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuestionList = [...questionList];

    updatedQuestionList.splice(questionIndex, 1);
    setQuestionList(updatedQuestionList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuestionSet = {
      question,
      answerChoices,
      correctAnswer,
      image,
    };

    setQuestionList([...questionList, newQuestionSet]);
    console.log("New Question:", newQuestionSet);

    setQuestion("");
    setAnswerChoices(["", "", "", ""]);
    setCorrectAnswer("");
    setImage(null);
    setFilename("No image selected");
  };

  const handlePostToDB = async (e) => {
    e.preventDefault();

    // const data = questionList
  
    // try {
    //    const response = await fetch("http://localhost:3005/api/questions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    //    })
    //   if (response.ok) {
    //     console.log("Successful")
    //   } else {
    //     console.log("Failed")
    //   }
    // } catch (error) {
    //   console.error("An error has occured:", error)
    // }
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
        zIndex={999}
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
      <h3 style={{ margin: "0px", marginTop: "0px" }}>Set New Questions</h3>
      <Box
        display="flex"
        flexDirection="column"
        bgcolor="#fff"
        marginTop="20px"
        padding="10px"
        borderRadius="0.625rem"
        boxShadow={boxShadow}
      >
        <Box
          sx={{
            "& .MuiTextField-root": { width: "100%" },
            "& .MuiOutlinedInput-root": { padding: "5px 5px" },
            "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root": {
              fontFamily: "Rubik",
            },
            "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
              padding: "0px",
              fontFamily: "Rubik",
            },
          }}
          noValidate
          autoComplete="on"
          spellCheck="off"
        >
          <form onSubmit={handleSubmit}>
            {/*Field for typing a new question*/}
            <Box>
              <label htmlFor="questionText">
                <p style={{ margin: "0px", fontFamily: "Rubik" }}>
                  Type Question:
                </p>
              </label>
              <TextField
                sx={{ p: "0px" }}
                id="questionText"
                multiline
                minRows={4}
                value={question}
                onChange={handleQuestionChange}
              />
            </Box>

            {/*Field for adding image to the question*/}
            <Box display="flex" alignItems="center" marginTop="20px">
              <label htmlFor="imageUpload">
                <p
                  style={{
                    margin: "0px",
                    fontFamily: "Rubik",
                  }}
                >
                  Add Image:
                </p>
              </label>

              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                style={{ marginLeft: "10px" }}
                hidden
                onChange={({ target: { files } }) => {
                  files[0] && setFilename(files[0].name);
                  if (files) {
                    setImage(URL.createObjectURL(files[0]));
                  }
                }}
              />
              <Box
                onClick={() => document.querySelector("#imageUpload").click()}
                marginLeft="20px"
                bgcolor="#83eaf8"
                height="min-content"
                alignItems="center"
                paddingX="20px"
                paddingY="5px"
                borderRadius="20px 0 20px 0"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <p
                  style={{
                    margin: "0px",
                    fontFamily: "Rubik",
                    fontStyle: "italic",
                    color: "#fff",
                  }}
                >
                  Choose file
                </p>
              </Box>
              {image ? (
                <Box ml="20px" value={image} display="flex">
                  <img
                    src={image}
                    alt=""
                    width="100rem"
                    height="100rem"
                    style={{
                      marginBottom: "10px",
                      backgroundColor: "lightgray",
                    }}
                  />
                  <Fab
                    variant="outlined"
                    style={{
                      textTransform: "capitalize",
                      color: "black",
                      backgroundColor: "white",
                      height: "2rem",
                      width: "2rem",
                      marginLeft: "5px",
                    }}
                    onClick={() => {
                      setImage(null);
                      setFilename("No selected image");
                    }}
                  >
                    <Close sx={{ fontSize: "15px" }} />
                  </Fab>
                </Box>
              ) : (
                <p
                  style={{
                    margin: "0px",
                    fontFamily: "Rubik",
                    fontStyle: "italic",
                    color: "#6b6a6a",
                    marginLeft: "10px",
                  }}
                >
                  {filename}
                </p>
              )}
            </Box>

            {/*Field for adding the answer choices*/}
            <Box>
              <label>
                <p
                  style={{
                    margin: "0px",
                    fontFamily: "Rubik",
                    marginTop: "20px",
                  }}
                >
                  Answer Choices:
                </p>
              </label>
              {answerChoices.map((answerChoice, index) => {
                return (
                  <Box
                    key={index}
                    noValidate
                    autoComplete="on"
                    spellCheck="off"
                  >
                    <TextField
                      multiline
                      minRows={1}
                      sx={{ marginBottom: "10px" }}
                      value={answerChoice}
                      onChange={(e) => handleAnswerChange(index, e)}
                    />
                  </Box>
                );
              })}
            </Box>

            {/*Field for selecting the correct answer for a question*/}
            <Box>
              <label htmlFor="correctAnswer">
                <p
                  style={{
                    margin: "0px",
                    fontFamily: "Rubik",
                    marginTop: "20px",
                  }}
                >
                  Correct Answer:
                </p>
              </label>
              <select
                value={correctAnswer}
                onChange={handleCorrectAnswer}
                id="correctAnswer"
                required
                style={{
                  width: "60%",
                  height: "2.3rem",
                  fontFamily: "Rubik",
                  fontWeight: "600",
                  padding: "10px",
                  borderRadius: "5px",
                  borderColor: "lightgray",
                }}
              >
                <option>Select the Correct Answer</option>
                {answerChoices.map((answerChoice, index) => {
                  return (
                    <option key={index} value={answerChoice}>
                      {answerChoice}
                    </option>
                  );
                })}
              </select>
            </Box>

            <Box mx="45%" mt="20px">
              <Button
                variant="contained"
                type="submit"
                style={{
                  textTransform: "capitalize",
                  backgroundColor: "#1494A6",
                  borderRadius: "0.625rem",
                }}
              >
                <p
                  style={{
                    margin: "0px",
                    fontFamily: "Rubik",
                    fontWeight: "bold",
                  }}
                >
                  Add
                </p>
              </Button>
            </Box>
          </form>
        </Box>
      </Box>

      <h3 style={{ margin: "0px", marginTop: "40px" }}>Preview</h3>

      {/*Added questions appear here*/}
      <form onSubmit={handlePostToDB}>
        <Box
          display="flex"
          flexDirection="column"
          bgcolor="#fff"
          marginTop="20px"
          padding="10px"
          borderRadius="0.625rem"
          boxShadow={boxShadow}
          fontFamily="Rubik"
        >
          <ol>
            {questionList.map((q, index) => (
              <li key={index} style={{ marginBottom: "15px" }}>
                {q.question}

                {image && (
                  <img src={image} alt="" width="100px" height="100px" />
                )}
                <ol type="A">
                  {q.answerChoices.map((choice, i) => (
                    <Box key={i} style={{ display: "flex" }}>
                      <li>{choice}</li>
                      <input
                        type="checkbox"
                        id={`answer-${index}_${i}`}
                        value={choice}
                        checked={selectedAnswer === choice}
                        onChange={(e) => {
                          setSelectedAnswer(e.target.value);
                        }}
                        style={{ marginLeft: "10px" }}
                      />
                    </Box>
                  ))}
                  <Box display="flex" flexDirection="column" mt="15px">
                    {q.result !== null && (
                      <Box>
                        {q.result === true ? (
                          <span style={{ color: "green" }}>Correct!</span>
                        ) : (
                          <span style={{ color: "red" }}>
                            Incorrect. The correct answer is{" "}
                            <span style={{ color: "#000", fontWeight: "600" }}>
                              {q.correctAnswer}
                            </span>
                          </span>
                        )}
                      </Box>
                    )}
                    <Box>
                      <Button
                        variant="contained"
                        style={{
                          textTransform: "capitalize",
                          backgroundColor: "lightgreen",
                          borderRadius: "0.625rem",
                          width: "max-content",
                          marginTop: "15px",
                        }}
                        onClick={() => handleSelectedAnswer(index)}
                      >
                        <p
                          style={{
                            margin: "0px",
                            fontFamily: "Rubik",
                            fontWeight: "bold",
                          }}
                        >
                          Check Answer
                        </p>
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          textTransform: "capitalize",
                          backgroundColor: "#6b6a6a",
                          borderRadius: "0.625rem",
                          width: "max-content",
                          marginTop: "15px",
                          marginLeft: "10px",
                        }}
                        onClick={() => handleRemoveQuestion(index)}
                      >
                        <p
                          style={{
                            margin: "0px",
                            fontFamily: "Rubik",
                            fontWeight: "bold",
                          }}
                        >
                          Remove
                        </p>
                      </Button>
                    </Box>
                  </Box>
                </ol>
              </li>
            ))}
          </ol>
          <Button
            variant="contained"
            type="submit"
            style={{
              textTransform: "capitalize",
              backgroundColor: "#1494A6",
              borderRadius: "0.625rem",
              width: "70%",
              alignSelf: "center",
            }}
            
          >
            <p
              style={{
                margin: "0px",
                fontFamily: "Rubik",
                fontWeight: "bold",
              }}
            >
              Post to Questions
            </p>
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default AddQuestion;
