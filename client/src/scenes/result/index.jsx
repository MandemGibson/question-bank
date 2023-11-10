import { Box } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import "../../cssModules/Results.css";
import Performance from "../../components/Performance";
import CollapsibleTable from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { fetchResult, selectResults } from "../../features/resultSlice";

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";

function Results() {
  const results = useSelector(selectResults)
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const user = useSelector(selectUser);
  const [studentsOfStaff, setStudentsOfStaff] = useState([]);
  const [averagePercentage, setAveragePercentage] = useState(0)
  const [grade, setGrade] = useState("N/A")

  const staffLevels = useMemo(() => {
    return user?.user.level.map((level) => level.name) || [];
  }, [user]);

  useEffect(() => {
    const filteredStudents = results.filter((student) => {
      const studentLevelName = student.student.level.name;
      return staffLevels.includes(studentLevelName);
    });

    
   const studentRecord =  filteredStudents.filter((val, index)=> filteredStudents.indexOf(val) === index)

    setStudentsOfStaff(studentRecord);
  }, [results, staffLevels]);

  console.log("Student of staff:",studentsOfStaff);

  
  useEffect(() => {
    const calculateAverageAndGrade = () => {
      const sum = studentsOfStaff.reduce((acc, result) => acc + result.result, 0);
      
      const average = sum / studentsOfStaff.length;
      
      let grade;
      if (average >= 70) {
        grade = "A";
      } else if (average >= 60) {
        grade = "B";
      } else if (average >= 50) {
        grade = "C";
      } else if (average >= 40) {
        grade = "D";
      } else {
        grade = "F";
      }
    
      setAveragePercentage(average);
      setGrade(grade);
    };

    calculateAverageAndGrade();
  }, [studentsOfStaff]);
  
  
  

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    dispatch(fetchResult());
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });


  return (
    <Box display="flex" flexDirection="column" padding="20px">
      <Box display="flex" justifyContent="right">
        <select
          style={{
            border: "none",
            backgroundColor: "#fff",
            borderRadius: "0.45rem",
            color: "#6b6a6a",
            minWidth: "min-content",
            fontFamily: "Allerta",
            padding: "10px",
            outline: "none",
            width: "8rem",
            marginRight: "15px",
          }}
        >
          <option>Today</option>
          <option>Last Week</option>
          <option>Last Month</option>
          <option>Last Year</option>
        </select>

        <select
          style={{
            border: "none",
            backgroundColor: "#fff",
            borderRadius: "0.45rem",
            color: "#6b6a6a",
            minWidth: "min-content",
            fontFamily: "Allerta",
            padding: "10px",
            outline: "none",
            width: "8rem",
          }}
        >
          <option>Combined</option>
          {user.user.level.map((level) => {
            return <option key={level.id}>{level.name}</option>;
          })}
        </select>
      </Box>
      <Box className="flexBoxes" display="flex" mt="40px">
        <Box
          className="best__stu"
          height="15rem"
          width="18rem"
          mr="20px"
          borderRadius="0.625rem"
          boxShadow={boxShadow}
        >
          <Box>
            <p style={{ margin: "10px", color: "#473333", fontSize: "25px" }}>
              Best performing students
            </p>
            {
              studentsOfStaff.filter((val)=> val.result >= 70).map((student) => {
                return <Performance name={`${student.student.firstname} ${student.student.middlename || ""} ${
                  student.student.lastname
                }`} level={student.student.level.name} />
              })
            }
            
          </Box>
        </Box>

        <Box
          className="average"
          height="15rem"
          width="18rem"
          mr="20px"
          borderRadius="0.625rem"
          boxShadow={boxShadow}
        >
          <p style={{ margin: "10px", color: "#473333", fontSize: "25px" }}>
            Average Grade
          </p>
          <p
            style={{
              margin: "10px",
              color: "#6b6a6a",
              fontSize: "60px",
              fontFamily: "Rubik",
            }}
          >
            {averagePercentage + "%"}
          </p>
          <p
            style={{
              margin: "10px",
              color: "#958383",
              fontSize: "40px",
              fontFamily: "Rubik",
              fontWeight: "normal",
            }}
          >
            Grade-
            <span
              style={{
                fontWeight: "700",
                fontSize: width <= 1067 ? "30px" : "50px",
                color: "#00B1C9",
              }}
            >
              {grade}
            </span>
          </p>
        </Box>
        <Box
          className="unknown"
          height="15rem"
          width="18rem"
          mr="20px"
          borderRadius="0.625rem"
          boxShadow={boxShadow}
        >
          <p style={{ margin: "10px", color: "#473333", fontSize: "25px" }}>
            Below Average
          </p>
          {
              studentsOfStaff.filter((val)=> val.result < 50).map((student) => {
                return <Performance name={`${student.student.firstname} ${student.student.middlename || ""} ${
                  student.student.lastname
                }`} level={student.student.level.name} />
              })
            }
        </Box>
        <Box
          className="worst__stu"
          height="15rem"
          width="18rem"
          borderRadius="0.625rem"
          boxShadow={boxShadow}
          overflow="hidden"
        >
          <p style={{ margin: "10px", color: "#473333", fontSize: "25px" }}>
            Worst performing students
          </p>
          {
              studentsOfStaff.filter((val)=> val.result <= 40).map((student) => {
                return <Performance name={`${student.student.firstname} ${student.student.middlename || ""} ${
                  student.student.lastname
                }`} level={student.student.level.name} />
              })
            }
        </Box>
      </Box>

      <Box mt="20px">
        <CollapsibleTable />
      </Box>
    </Box>
  );
}

export default Results;
