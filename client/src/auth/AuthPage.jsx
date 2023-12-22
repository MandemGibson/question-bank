import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../features/userSlice";

const initialValues = {
  userId: "",
  password: "",
};

// const numericRegExp = /^[0-9]*$/;

const userSchema = yup.object().shape({
  userId: yup
    .string()
    // .matches(numericRegExp, "ID must contain only numbers")
    .required("required"),
  password: yup.string().required("required"),
});

function AuthPage() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showID, setShowID] = useState(false);

  const handleIDClick = () => {
    setShowID(!showID);
  };

  const handlePasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const LoginToApp = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3005/api/auth/login",
        values,
      );
      const Id = response.data;

      console.log(response);
      console.log(Id);

      localStorage.setItem("sessionId", JSON.stringify(Id));

      dispatch(login(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      bgcolor="#fff"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root": {
            fontFamily: "Acme",
          },
          "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#83eaf8",
            borderWidth: "3px",
          },
          "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
            fontFamily: "Acme",
          },
        }}
        // width="50%"
        // bgcolor={"red"}
        p={2}
        borderRadius={"0.5rem"}
        boxShadow={"0px 4px 6px 4px rgba(0,0,0,0.4)"}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={userSchema}
          onSubmit={(values, { setSubmitting }) => {
            LoginToApp(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box textAlign="center">
                <p
                  style={{
                    margin: "0px",
                    fontFamily: "Acme",
                    fontSize: "40px",
                    alignSelf: "center",
                    justifySelf: "center",
                    marginBottom: "50px",
                    width: "100%",
                    color: "#4f9eb4",
                  }}
                >
                  Login
                </p>
              </Box>

              <TextField
                fullWidth
                type={!showID ? "password" : "text"}
                label="Enter your ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userId}
                name="userId"
                error={!!touched.userId && !!errors.userId}
                helperText={touched.userId && errors.userId}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleIDClick}>
                        {!showID ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: "30px",
                }}
                autoComplete="off"
              />
              <TextField
                fullWidth
                type={!showPassword ? "password" : "text"}
                label="Enter your password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordClick}>
                        {!showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  autoComplete: "off",
                }}
                sx={{
                  mb: "20px",
                }}
              />
              <Typography sx={{ fontFamily: "Acme", color:"#6b6a6a" }}>
                Forgotten Password?{" "}
                <span>
                  <a href="/">Click here to reset</a>
                </span>
              </Typography>
              <Button
                style={{
                  textTransform: "capitalize",
                  borderRadius: "0.5rem",
                  backgroundColor: "#4f9eb4",
                  width: "100%",
                  marginTop: "20px",
                }}
                variant="none"
                type="submit"
                disabled={isSubmitting}
              >
                <p
                  style={{
                    margin: "0px",
                    fontFamily: "Rubik",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Log In
                </p>
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default AuthPage;
