import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../cssModules/Results.css";
import Performance from "../../components/Performance";
import CollapsibleTable from "../../components/Table";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";

function Results() {
  const [width, setWidth] = useState(window.innerWidth);
  const user = useSelector(selectUser);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

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
            <Performance
              name="Philip Cudjoe Gibson"
              subtitle="Average time on a question"
              level="Jhs 2"
              duration="30 sec"
            />
            <Performance
              name="Philip Cudjoe Gibson"
              subtitle="Average time on a question"
              level="Jhs 2"
              duration="30 sec"
            />
            <Performance
              name="Philip Cudjoe Gibson"
              subtitle="Average time on a question"
              level="Jhs 2"
              duration="30 sec"
            />
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
            62.7%
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
              B
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
          <Performance
            name="Philip Cudjoe Gibson"
            subtitle="Average time on a question"
            level="Jhs 2"
            duration="30 sec"
          />
          <Performance
            name="Philip Cudjoe Gibson"
            subtitle="Average time on a question"
            level="Jhs 2"
            duration="30 sec"
          />
        </Box>
      </Box>

      <Box mt="20px">
        <CollapsibleTable />
      </Box>
    </Box>
  );
}

export default Results;
