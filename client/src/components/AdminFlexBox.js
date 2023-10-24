import { Box } from "@mui/material";
import React from "react";

function AdminFlexBox({ header, count }) {
  return (
    <Box bgcolor="white" height="10rem" width="15rem" borderRadius="0.625rem">
      <div style={{ padding: "10px 0 0 10px" }}>
        <p
          style={{
            margin: "0px",
            fontSize: "1.25rem",
            fontWeight: "700",
            color: "#6b6a6a",
          }}
        >
          {header}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "65%",
        }}
      >
        <p
          style={{
            margin: "0px",
            fontSize: "1.875rem",
            fontWeight: "700",
            color: "#2F95CE",
          }}
        >
          {count}
        </p>
      </div>
    </Box>
  );
}

export default AdminFlexBox;
