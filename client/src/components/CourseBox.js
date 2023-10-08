import { Box } from "@mui/material";
import React from "react";

function CourseBox({ image, title, subtitle }) {
  return (
    <Box
      height="15rem"
      width="15rem"
      bgcolor="pink"
      borderRadius="0.625rem"
      position="relative"
      sx={{
        "&:hover": {
          transform: "scale(1.1)",
          transition: "transform 200ms ease-in-out",
          cursor: "pointer",
        },
      }}
    >
      <img
        src={image}
        alt=""
        width="100%"
        height="100%"
        style={{ objectFit: "cover", borderRadius: "0.625rem" }}
      />
      <Box
        display="flex"
        position="absolute"
        flexDirection="column"
        width="100%"
        height="min-content"
        bottom={0}
        sx={{
          borderBottomLeftRadius: "0.625rem",
          borderBottomRightRadius: "0.625rem",
          background: "rgba(0,0,0, 0.7)",
        }}
      >
        <Box p={1.5}>
          <p style={{ margin: "0px", color: "white" }}>{title}</p>
          <p style={{ margin: "0px", color: "white", fontSize: "12px" }}>
            {subtitle}
          </p>
        </Box>
      </Box>
    </Box>
  );
}

export default CourseBox;
