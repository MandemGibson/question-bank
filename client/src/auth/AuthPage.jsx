import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Security from "../images/Security.png";
import { Formik } from "formik";
import * as yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useDispatch } from "react-redux";
import axios from "axios";

const initialValues = {
  userId: "",
  password: "",
};

const numericRegExp = /^[0-9]*$/;

const userSchema = yup.object().shape({
  userId: yup
    .string()
    .matches(numericRegExp, "ID must contain only numbers")
    .required("required"),
  password: yup.string().required("required"),
});

function AuthPage() {
  const [values, setValues] = useState(initialValues)
  const [showPassword, setShowPassword] = useState(false);
  const [showID, setShowID] = useState(false);

  const handleIDClick = () => {
    setShowID(!showID);
  };

  const handlePasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const LoginToApp = async (e) => {
    e.preventDefault();

    const userData = {
      userId: values.userId,
      password: values.password
    }

    try {
      const response = await axios.post("http://localhost:3005/api/auth/login", userData)
      const { user, sessionId } = response.data
      
      localStorage.setItem("sessionId", sessionId)

      axios.defaults.headers.common["Authorization"] = `Bearer ${sessionId}`
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <Box height="100%" width="100%" bgcolor="#fff" justifyContent="center">
      <Box display="flex">
        <img
          src={Security}
          alt=""
          width="400px"
          height="600px"
          style={{ objectFit: "contain" }}
        />
        <Box
          alignSelf="center"
          paddingLeft="10em"
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
          width="30%"
        >
          <Formik initialValues={initialValues} validationSchema={userSchema}>
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
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
                      color: "#83eaf8",
                    }}
                  >
                    sign in to continue
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
                <Button
                  style={{
                    textTransform: "capitalize",
                    borderRadius: "0.625rem",
                    backgroundColor: "#83eaf8",
                    width: "100%",
                    marginTop: "20px",
                  }}
                  variant="none"
                  type="submit"
                  onClick={LoginToApp}
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
                    sign in
                  </p>
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}

export default AuthPage;
