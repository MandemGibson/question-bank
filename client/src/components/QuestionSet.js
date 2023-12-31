import { MoreVert } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeQuestion } from "../features/questionSlice";

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";

function QuestionSet({
  image,
  title,
  subtitle,
  duration,
  days,
  onClick,
  questionId,
}) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = async (option, e) => {
    e.stopPropagation();

    if (option === "Delete") {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        await axios.delete(`${apiUrl}/questions/${questionId}`);
        dispatch(removeQuestion(questionId));
      } catch (error) {
        console.error(error);
      }
    }
    handleClose();
  };

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
          <IconButton onClick={handleClick}>
            {<MoreVert style={{ color: "#6b6a6a" }} />}
          </IconButton>
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={(e) => handleOptionClick("Edit", e)}>Edit</MenuItem>
        <MenuItem onClick={(e) => handleOptionClick("Delete", e)}>
          Delete
        </MenuItem>
        <MenuItem onClick={(e) => handleOptionClick("Download", e)}>
          Download
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default QuestionSet;
