import { Box, Stack } from "@mui/material";
import React from "react";
import CircularProgressBar from "../../components/CircularProgress";
import CircleIcon from "@mui/icons-material/Circle";

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";
const value = 85;

function Statistics() {
  return (
    <Box display="flex" flexDirection="column" margin="20px">
      <Box display="flex">
        <Box
          bgcolor="white"
          height="16rem"
          width="18rem"
          mr="20px"
          borderRadius="0.625rem"
          boxShadow={boxShadow}
          padding="5px"
          display="flex"
          flexDirection="column"
        >
          <Box display="flex" justifyContent="space-between">
            <p style={{ margin: "0px", color: "#6b6a6a" }}>Attendance</p>
            <select
              style={{
                border: "none",
                backgroundColor: "#d9d9d9",
                borderRadius: "0.45rem",
                color: "#6b6a6a",
                width: "min-content",
                fontFamily: "Allerta",
                padding: "5px",
                outline: "none",
              }}
            >
              <option>My class</option>
              <option>My class</option>
              <option>My class</option>
            </select>
          </Box>
          <Box
            alignSelf="center"
            justifySelf="center"
            pt="20px"
            fontFamily="Rubik"
            fontWeight="600"
          >
            <CircularProgressBar value={value} />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" flexDirection="column">
              <Box display="flex" alignItems="center">
                <CircleIcon
                  sx={{
                    width: "20px !important",
                    height: "20px !important",
                    color: "#00B1C9",
                  }}
                />
                <p style={{ margin: "0px", color: "#6b6a6a" }}>Present</p>
              </Box>
              <Box display="flex" alignItems="center">
                <CircleIcon
                  sx={{
                    width: "20px !important",
                    height: "20px !important",
                    color: "#E46E00",
                  }}
                />
                <p style={{ margin: "0px", color: "#6b6a6a" }}>Absent</p>
              </Box>
            </Box>
            <Box>
              <p style={{ margin: "0px", color: "#6b6a6a" }}>Total: 58</p>
            </Box>
          </Box>
        </Box>
        <Box
          bgcolor="white"
          height="16rem"
          width="24rem"
          mr="20px"
          borderRadius="0.625rem"
          boxShadow={boxShadow}
          padding="5px"
          display="flex"
          flexDirection="column"
        >
          <Box display="flex" justifyContent="space-between">
            <p style={{ margin: "0px", color: "#6b6a6a" }}>Recorded Grades</p>
            <select
              style={{
                border: "none",
                backgroundColor: "#d9d9d9",
                borderRadius: "0.45rem",
                color: "#6b6a6a",
                width: "min-content",
                fontFamily: "Allerta",
                padding: "5px",
                outline: "none",
              }}
            >
              <option>My class</option>
              <option>My class</option>
              <option>My class</option>
            </select>
          </Box>
          <Box><Stack/></Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Statistics;
