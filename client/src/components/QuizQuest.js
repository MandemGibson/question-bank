import { Box, Button } from "@mui/material";
import React from "react";

function QuizQuest({ title, deadline, duration, onClick }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={2}
    >
      <Box display="flex" flexDirection="column" width="100%" mr="50px">
        <Box display="flex" justifyContent="space-between" width="100%">
          <p style={{ margin: "0px", color: "#6b6a6a", fontSize: "15px" }}>
            {title}
          </p>
          <p style={{ margin: "0px", color: "#958383", fontSize: "13px" }}>
            Deadline is {deadline}
          </p>
          <p style={{ margin: "0px", color: "#6b6a6a", fontSize: "15px" }}>
            {duration}
          </p>
        </Box>
        <Box borderBottom="1px solid #d9d9d9" mt="5px" />
      </Box>
      <Button
        variant="none"
        style={{
          textTransform: "capitalize",
          borderRadius: "0.625rem",
          backgroundColor: "#83eaf8",
          color: "#fff",
          fontFamily: "Rubik",
          fontWeight: "bold",
          width: "15rem",
        }}
        onClick={onClick}
      >
        <p style={{ margin: "0px" }}>Attempt Quiz</p>
      </Button>
    </Box>
  );
}

export default QuizQuest;
