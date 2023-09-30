import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../cssModules/Results.css";
import Performance from "../../components/Performance";
import CollapsibleTable from "../../components/Table";

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";

function Results() {
  const [level, setLevel] = React.useState("");
  const [when, setWhen]= useState("Today")
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const handleChange = (event) => {
    setLevel(event.target.value);
  };

  const handleWhen = (event) => {
    setWhen(event.target.value);
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
        <Box>
          <FormControl sx={{ m: 1, minWidth: 80, bgcolor: "white" }} >
            <Select
              id="demo-simple-select-autowidth"
              value={when}
              onChange={handleWhen}
              autoWidth
            >
              <MenuItem value="">
                <em>My class</em>
              </MenuItem>
              <MenuItem value={10}>Today</MenuItem>
              <MenuItem value={21}>Last week</MenuItem>
              <MenuItem value={22}>Last month</MenuItem>
              <MenuItem value={23}>Last year</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 80, bgcolor:"white" }}>
            <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={level}
              onChange={handleChange}
              autoWidth
              label="Age"
            >
              <MenuItem value="">
                <em>My class</em>
              </MenuItem>
              <MenuItem value={10}>Twenty</MenuItem>
              <MenuItem value={21}>Twenty one</MenuItem>
              <MenuItem value={22}>Twenty one and a half</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
            Empty for now
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
