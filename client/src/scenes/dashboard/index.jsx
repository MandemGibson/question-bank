import { Box } from "@mui/material";
import React from "react";
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

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";

function Dashboard() {
  const questions = useSelector(selectQuestion);
  const navigator = useNavigate();

  const handleClick = () => {
    navigator("/questions");
  };
  const num1 = 2;
  const num2 = questions.length;
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
                transition:"all 0.3s"
              }
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
                transition:"all 0.3s"
              }
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
                transition:"all 0.3s"
              }
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
        <Box></Box>
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
            num1={2}
            num2={num2}
          />
          <Recent
            title="Posted Questions"
            subtitle={`${num1} of ${num2} completed`}
            num1={2}
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
              Students taking your exams now
            </p>
          </Box>
          <Box display="flex" justifyContent="space-between" mb="10px">
            <p style={{ margin: "0px", fontWeight: "bold" }}>Name</p>
            <p style={{ margin: "0 30px 0 0", fontWeight: "bold" }}>Class</p>
          </Box>
          <AttendanceSheet name="Philip Gibson Cudjoe" level="JHS 2" />
          <AttendanceSheet name="Philip Gibson Cudjoe" level="Primary 4" />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
