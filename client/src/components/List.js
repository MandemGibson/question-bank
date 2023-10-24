import { Box } from "@mui/material";
import React from "react";

function List({ id, name, email, level }) {
  return (
    <Box display="flex" mx="20px" justifyContent="space-between">
      <p>{id}</p>
      <p>{name}</p>
      <p>{email}</p>
      <p>{level}</p>
    </Box>
  );
}

export default List;
