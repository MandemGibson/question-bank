import { MoreVert } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";

function QuestionSet({ image, title, subtitle, duration, days, onClick }) {
  return (
    <Box
      display="flex"
      height="max-content"
      maxWidth="700px"
      bgcolor="white"
      borderRadius="0.625rem"
      boxShadow={boxShadow}
      margin="20px 0 20px 0"
      onClick={onClick}
    >
      <img
        src={image}
        alt=""
        height="100rem"
        width="100rem"
        style={{ objectFit: "contain", borderRadius: "0.625rem 0 0 0.625rem" }}
      />
      <Box display="flex" width="100%" justifyContent="space-between">
        <Box
          margin="10px 0 10px 50px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <h3 style={{ margin: "0px", fontFamily: "Rubik" }}>{title}</h3>
          <p
            style={{
              margin: "0px",
              fontFamily: "Rubik",
              fontWeight: "600",
              color: "#6b6a6a",
            }}
          >
            {subtitle}
          </p>
          <p
            style={{
              margin: "0px",
              fontFamily: "Rubik",
              fontWeight: "600",
              color: "#6b6a6a",
              fontSize: "12px",
            }}
          >
            {duration}
          </p>
        </Box>
        <Box
          margin="0px 10px 10px 10px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <IconButton>{<MoreVert style={{ color: "#6b6a6a" }} />}</IconButton>
          <p
            style={{
              margin: "0px",
              fontFamily: "Rubik",
              fontWeight: "600",
              color: "#6b6a6a",
            }}
          >
            {days}
          </p>
        </Box>
      </Box>
    </Box>
  );
}

export default QuestionSet;
