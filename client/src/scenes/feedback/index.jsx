import { Box, Button, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import "../../cssModules/Feedback.css";
import rating from "../../images/young man pointing at rating window.png";
import emailjs from "@emailjs/browser"

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25);";

function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const form = useRef()

  const handleSubmit = (e) => {
    e.preventDefault();

    setName("");
    setEmail("");
    setMessage("");

    // const newFeedback = {
    //   name,
    //   email,
    //   message
    // }

    emailjs.sendForm('service_fnggl2e', 'template_ofx548o', form.current, '2PfUQfuJ0QK_v-HMJ')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      sx={{
        "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root": {
          fontFamily: "Montserrat",
          padding: "20px",
          borderRadius: "1.25rem",
          bgcolor: "whitesmoke",
        },
        "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root.Mui-Focused .Mui-OutlinedInput-notchedOutline": {
          borderWidth: "1px",
        },
      }}
    >
      <Box
        display="flex"
        p="20px"
        bgcolor="white"
        width="57rem"
        height="52"
        my="auto"
        borderRadius="1.25rem"
        alignSelf="center"
        boxShadow={boxShadow}
      >
        <form style={{ display: "flex"}} onSubmit={handleSubmit} ref={form}>
          <Box ml={1} mr="20px">
            <p
              style={{
                margin: "0",
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "20px",
                color: "#6b6a6a",
              }}
            >
              Feel there is something wrong?
            </p>
            <p
              style={{
                margin: "0",
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#6b6a6a",
              }}
            >
              Or Have any suggestion?
            </p>
            <p
              style={{
                margin: "0",
                fontSize: "2.5rem",
                fontWeight: "600",
                marginTop: "30px",
                marginBottom: "30px",
                color: "rgba(0,0,0,0.7)",
              }}
            >
              Give us a feedback
            </p>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "22.5rem",
                height: "3rem",
                borderRadius: "1.25rem",
                outline: "none",
                backgroundColor: "whitesmoke",
                marginBottom: "20px",
                paddingLeft: "20px",
                paddingRight: "20px",
                fontSize: "15px",
                fontFamily: "Montserrat",
              }}
              className="form-input"
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "22.5rem",
                height: "3rem",
                borderRadius: "1.25rem",
                outline: "none",
                backgroundColor: "whitesmoke",
                marginBottom: "20px",
                paddingLeft: "20px",
                paddingRight: "20px",
                fontSize: "15px",
                fontFamily: "Montserrat",
              }}
              className="form-input"
            />
            <br />
            <TextField
              placeholder="Message goes here..."
              multiline
              name="message"
              minRows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: "25rem" }}
            />
          </Box>
          <Box ml="20px" position="relative">
            <img src={rating} alt="" />
            <Button
              type="submit"
              variant="none"
              style={{
                borderRadius: "1.25rem",
                position: "absolute",
                bottom: "0",
                left: "0",
                textTransform: "capitalize",
                border: "3px solid #859D94",
                backgroundColor: "#EAE6E3",
                fontFamily: "Rubik",
                fontWeight: "600",
                // color: "white",
                width: "100%",
                height: "3rem",
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Feedback;
