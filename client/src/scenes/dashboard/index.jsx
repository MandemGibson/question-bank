import { Box } from "@mui/material";
import React, { useMemo } from "react";
import "../../cssModules/Dashboard.css";
import img1 from "../../images/57  Write, Basic, Essential, Pencil.png";
import img2 from "../../images/Component 7.png";
import img3 from "../../images/Many Line Graph.png";
import Recent from "../../components/Recent";
import { Link } from "react-router-dom";
import AttendanceSheet from "../../components/AttendanceSheet";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectQuestion } from "../../features/questionSlice";
import { selectUser } from "../../features/userSlice";
import { selectResults } from "../../features/resultSlice";

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";

function Dashboard() {
  const questions = useSelector(selectQuestion);
  const navigator = useNavigate();
  const user = useSelector(selectUser);
  const results = useSelector(selectResults);

  const handleClick = () => {
    navigator("/questions");
  };

  const staffLevels = useMemo(() => {
    return user?.user.level.map((level) => level.name) || [];
  }, [user]);

  const filteredResult = results.filter((student) => {
    const studentLevelName = student.student.level.name;
    return staffLevels.includes(studentLevelName);
  });

  const filteredStudents = [];

  filteredResult.forEach((student) => {
    const existingIndex = filteredStudents.findIndex(
      (s) => s.student.id === student.student.id
    );

    if (existingIndex === -1) {
      filteredStudents.push(student);
    } else {
      const existingStudent = filteredStudents[existingIndex];

      if (new Date(student.createdAt) > new Date(existingStudent.createdAt))
        filteredStudents[existingIndex] = student;
    }
  });

  console.log(filteredStudents);

  const filteredQuestions = questions.filter(
    (question) => question.staffId === user.user.id
  );

  const completedQuestions = filteredQuestions.filter(
    (question) => question.isCompleted === true
  );

  const num1 = completedQuestions.length;
  const num2 = filteredQuestions.length;
  return (
    <Box display="flex">
      <Box m="10px 20px 10px 20px">
        <h3 style={{ margin: "0px" }}>Overview</h3>
        <Box display="flex" className="boxes">
          <Box
            width="15rem"
            height="10rem"
            display="flex"
            alignItems="center"
            borderRadius="0.625rem"
            justifyContent="space-between"
            className="box1"
            onClick={handleClick}
            sx={{
              transition: "all 0.3s",
              "&:hover": {
                transform: "scale(1.1)",
                transition: "all 0.3s",
              },
            }}
          >
            <p style={{ color: "white", alignSelf: "end", marginLeft: "15px" }}>
              Questions
            </p>
            <img
              src={img1}
              alt=""
              width="100px"
              height="120px"
              style={{ marginRight: "15px" }}
            />
          </Box>
          <Box
            width="15rem"
            height="10rem"
            display="flex"
            alignItems="center"
            borderRadius="0.625rem"
            justifyContent="space-between"
            className="box2"
            onClick={() => navigator("/results")}
            sx={{
              transition: "all 0.3s",
              "&:hover": {
                transform: "scale(1.1)",
                transition: "all 0.3s",
              },
            }}
          >
            <p style={{ color: "white", alignSelf: "end", marginLeft: "15px" }}>
              Results
            </p>
            <img
              src={img2}
              alt=""
              width="100px"
              height="120px"
              style={{ marginRight: "15px" }}
            />
          </Box>
          <Box
            width="15rem"
            height="10rem"
            display="flex"
            alignItems="center"
            borderRadius="0.625rem"
            justifyContent="space-between"
            className="box3"
            onClick={() => navigator("/statistics")}
            sx={{
              transition: "all 0.3s",
              "&:hover": {
                transform: "scale(1.1)",
                transition: "all 0.3s",
              },
            }}
          >
            <p style={{ color: "white", alignSelf: "end", marginLeft: "15px" }}>
              Statistics
            </p>
            <img
              src={img3}
              alt=""
              width="100px"
              height="120px"
              style={{ marginRight: "15px" }}
            />
          </Box>
        </Box>
        <Box
          bgcolor="white"
          textAlign="center"
          height="min-content"
          minHeight="75%"
          // mb="20px"
          boxShadow={boxShadow}
          borderRadius="0.625rem"
        ></Box>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          flexDirection="column"
          marginTop="40px"
          bgcolor="#fff"
          padding="10px"
          width="100%"
          height="max-content"
          borderRadius="0.625rem"
          boxShadow={boxShadow}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            marginBottom="20px"
          >
            <p style={{ margin: "0px", fontFamily: "Amaranth" }}>
              Recent Activity
            </p>
            <Link style={{ color: "#83eaf8" }}>
              <p
                style={{
                  margin: "0px",
                  fontFamily: "Amaranth",
                  fontSize: "15px",
                }}
              >
                View All
              </p>
            </Link>
          </Box>
          <Recent
            title="Posted Questions"
            subtitle={`${num1} of ${num2} completed`}
            num1={num1}
            num2={num2}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          marginTop="40px"
          bgcolor="#fff"
          padding="10px"
          width="100%"
          height="max-content"
          borderRadius="0.625rem"
          boxShadow={boxShadow}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            marginBottom="10px"
          >
            <p style={{ margin: "0px", fontFamily: "Amaranth" }}>
              Your best students
            </p>
          </Box>
          <Box display="flex" justifyContent="space-between" mb="10px">
            <p style={{ margin: "0px", fontWeight: "bold" }}>Name</p>
            <p style={{ margin: "0 30px 0 0", fontWeight: "bold" }}>Class</p>
          </Box>
          {filteredStudents.map((student) => {
            return (
              <AttendanceSheet
                key={student.id}
                name={`${student.student.firstname} ${student.student
                  .middlename || ""} ${student.student.lastname}`}
                level={student.student.level.name}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
