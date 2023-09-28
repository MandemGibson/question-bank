import { Box } from "@mui/material";
import React from "react";

function AttendanceSheet({ name, level }) {
  return (
    <>
      <Box display="flex" justifyContent="space-between" mb="5px">
        <p
          style={{
            margin: "0px",
            fontWeight: "400",
            fontSize: "15px",
            maxWidth: "60%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </p>
        <p style={{ margin: "0px", fontWeight: "400", fontSize: "15px" }}>
          {level}
        </p>
      </Box>
      <Box border="1px solid #d9d9d9" mb="20px" />
    </>
  );
}

export default AttendanceSheet;
