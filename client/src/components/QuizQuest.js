import { Box, Button } from "@mui/material";
import React from "react";

function QuizQuest({
  title,
  deadline,
  duration,
  onClick,
  buttonText,
  disabled,
  color,
}) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={2}
    >
      <Box display="flex" flexDirection="column" width="100%" mr="40px">
        <Box display="flex" width="100" justifyContent="space-between">
          <Box width="30%">
            <p style={{ margin: "0px", color: "#6b6a6a", fontSize: "15px" }}>
              {title}
            </p>
          </Box>

          <Box textAlign="start" width="30%">
            <p
              style={{
                margin: "0px",
                color: "#958383",
                fontSize: "13px",
                width: "100%",
              }}
            >
              Deadline is {deadline}
            </p>
          </Box>
          <Box width="10%" ml="5.4rem" textAlign="end">
            <p
              style={{
                margin: "0px",
                color: "#6b6a6a",
                fontSize: "15px",
              }}
            >
              {duration} mins
            </p>
          </Box>
        </Box>
        <Box borderBottom="1px solid #d9d9d9" mt="5px" flex="1" />
      </Box>
      <Button
        variant="none"
        style={{
          textTransform: "capitalize",
          borderRadius: "0.625rem",
          backgroundColor: color,
          color: "#fff",
          fontFamily: "Rubik",
          fontWeight: "bold",
          width: "15rem",
        }}
        disabled={disabled}
        onClick={onClick}
      >
        <p style={{ margin: "0px" }}>{buttonText}</p>
      </Button>
    </Box>
  );
}

export default QuizQuest;
