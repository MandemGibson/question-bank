import { Box } from "@mui/material";
import React from "react";

function Recent({ title, subtitle, num1, num2 }) {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        marginBottom="5px"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column">
          <h3
            style={{
              margin: "0px",
              fontSize: "15px",
              fontFamily: "Allerta",
              fontWeight: "500",
            }}
          >
            {title}
          </h3>
          <p style={{ margin: "0px", fontSize: "12px", color: "#6b6a6a" }}>
            {subtitle}
          </p>
        </Box>
        <Box
          bgcolor="#D9D9D9"
          height="2.5rem"
          width="3rem"
          borderRadius="0.625rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <p style={{ margin: "0px" }}>
            {num1}/{num2}
          </p>
        </Box>
      </Box>
      <Box border="1px solid #d9d9d9" mb="20px" />
    </>
  );
}

export default Recent;
