import { Box } from "@mui/material";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, selectQuestion } from "../../features/questionSlice";
import { useNavigate } from "react-router";

const customStyles = {
  head: {
    style: {
      fontSize: "1rem",
      fontWeight: "600",
      color: "#201D1D",
    },
  },
};

function SAdminQuestionList() {
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestion);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleOpen = (questionId) => {
    navigate(`/questions-review/${questionId}`)
  }

  const questionColumn = [
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Name of Teacher",
      selector: (row) => row.name,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Class",
      selector: (row) => row.level,
    },
    {
      name: "Date Created",
      selector: (row) => row.createdAt,
    },
    {
      name: "Status",
      selector: (row) => {
        return (
          <Box
            textAlign={"center"}
            style={{
              borderRadius: "0.3125rem",
              color: row.status ? "#4CDA35" : "red",
              fontWeight: "600",
            }}
          >
            {row.status ? <p>Completed</p> : <p>Not done</p>}
          </Box>
        );
      },
    },
    {
      name: "Review",
      selector: (row) => {
        return (
          <button
            style={{
              borderRadius: "0.3125rem",
              backgroundColor: "lightblue",
              // color:"#4CDA35",
              color: "white",
              fontWeight: "600",
              height: "1.625rem",
              width: "4.1875rem",
              outline: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={()=>handleOpen(row.questionId)}
          >
            Open
          </button>
        );
      },
    },
  ];

  const questionData = questions?.map((question) => ({
    type: question.category.name,
    name: `${question.staff.firstname} ${question.staff.middlename || ""} ${
      question.staff.lastname
    }`,
    title: question.title,
    level: question.level.name,
    createdAt: question.createdAt.split("T")[0],
    status: question.isCompleted,
    questionId: question.id
  }));
  return (
    <Box mx={2} bgcolor={"white"} height={"100%"}>
      <Box mx="10px" boxShadow={"inset 0px 0px 10px 5px rgba(0, 0, 0, 0.1)"}>
        <DataTable
          title={
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <p style={{fontWeight:"bold"}}>Question Papers</p>
              <p style={{fontSize:"18px"}}>Total Question Papers: {questions.length}</p>
            </div>
          }
          columns={questionColumn}
          data={questionData}
          responsive
          pagination
          fixedHeader
          highlightOnHover
          customStyles={customStyles}
        />
        {/* <p>Hello</p> */}
      </Box>
    </Box>
  );
}

export default SAdminQuestionList;
