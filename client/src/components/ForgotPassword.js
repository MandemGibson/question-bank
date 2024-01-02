import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";

function ForgotPassword({ onClose, onSubmit }) {
  const [userId, setUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userId);
  };

  return (
    <Box
      display="flex"
      bgcolor="rgba(0,0,0, 0.3)"
      position="absolute"
      top="0"
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      left="0"
      zIndex={999}
    >
      <Box
        position="relative"
        bgcolor="white"
        width="30rem"
        minHeight="20rem"
        borderRadius="1.25rem"
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
        <form
          style={{ display: "flex", flexDirection: "column", padding: "15px" }}
          onSubmit={handleSubmit}
        >
          <IconButton
            sx={{ position: "absolute", right: 0, top: 0 }}
            onClick={onClose}
          >
            <Close />
          </IconButton>
          <Box textAlign="center">
            <p style={{ margin: 0 }}>Forgot Password</p>
          </Box>

          <TextField
            label="User ID"
            placeholder="Enter your ID"
            variant="outlined"
            margin="normal"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
