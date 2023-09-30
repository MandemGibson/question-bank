import { Box } from "@mui/material";
import React from "react";

function Modal() {
  return (
    <Box>
      <form>
        <label htmlFor="title">Title</label>
        <input id="title" placeholder="Enter the title of the question" />
        <label htmlFor="class">Class</label>
        <input id="class" placeholder="Enter the class" />
        <input type="submit" />
      </form>
    </Box>
  );
}

export default Modal;
