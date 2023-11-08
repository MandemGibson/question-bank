import {
    Box,
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
  } from "@mui/material";
  import { Formik } from "formik";
  import React from "react";
  import { useSelector } from "react-redux";
  import * as yup from "yup";
  import { selectClass } from "../../../features/classSlice";
  import axios from "axios";
  
  const initialValues = {
    firstname: "",
    middlename: "",
    lastname: "",
    dob: "",
    residence: "",
    password: "",
    level: [],
  };
  
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  
  const userSchema = yup.object().shape({
    firstname: yup.string().required("required"),
    lastname: yup.string().required("required"),
    dob: yup.date().required("required"),
    residence: yup.string().required("required"),
    password: yup
      .string()
      .matches(
        PASSWORD_REGEX,
        "Password must contain at least one uppercase, lowercase and a digit and not less than 8 characters long"
      )
      .required("required"),
  });
  
  const TextFieldStyle = {
    marginBottom: "3rem",
    width: "20rem",
    height: "2rem",
  };
  
  function AddStudent() {
    const levels = useSelector(selectClass);
  
    const handleCreateStudent = async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:3005/api/students",
          values,
          {
            withCredentials: true,
          }
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <Box display="flex" flexDirection="column" m={2}>
        <Box bgcolor="white" width="100%">
          <p style={{ margin: "10px 0 0px 10px", fontWeight: "600" }}>
            All fields marked <span style={{ color: "#ff0000" }}>*</span> are
            required
          </p>
          <Box
            sx={{
              "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root": {
                fontFamily: "Amaranth",
              },
              "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000",
                borderWidth: "3px",
              },
              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                fontFamily: "Amaranth",
                fontStyle: "italic",
              },
            }}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={userSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleCreateStudent(values);
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
                setFieldValue,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                  }}
                >
                  <Box display="flex">
                    <Box display="flex" flexDirection="column">
                      <p style={{ fontWeight: "600", fontSize: "1.6rem" }}>
                        Profile
                      </p>
                      <TextField
                        fullWidth
                        type="text"
                        name="firstname"
                        label={
                          <p style={{ margin: "0" }}>
                            firstname<span style={{ color: "#ff0000" }}>*</span>
                          </p>
                        }
                        value={values.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.firstname && !!errors.firstname}
                        helperText={touched.firstname && errors.firstname}
                        sx={TextFieldStyle}
                      />
                      <TextField
                        fullWidth
                        type="text"
                        name="middlename"
                        label="middlename"
                        value={values.middlename}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={TextFieldStyle}
                      />
                      <TextField
                        fullWidth
                        type="text"
                        name="lastname"
                        label={
                          <p style={{ margin: "0" }}>
                            lastname<span style={{ color: "#ff0000" }}>*</span>
                          </p>
                        }
                        value={values.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.lastname && !!errors.lastname}
                        helperText={touched.lastname && errors.lastname}
                        sx={TextFieldStyle}
                      />
                      <InputLabel>
                        <p
                          style={{
                            margin: "0",
                            fontFamily: "Amaranth",
                            fontStyle: "italic",
                          }}
                        >
                          date of birth<span style={{ color: "#ff0000" }}>*</span>
                        </p>
                      </InputLabel>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="date"
                        name="dob"
                        value={values.dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.dob && !!errors.dob}
                        helperText={touched.dob && errors.dob}
                        sx={TextFieldStyle}
                      />
                      <TextField
                        type="text"
                        name="residence"
                        label={
                          <p style={{ margin: "0" }}>
                            residence<span style={{ color: "#ff0000" }}>*</span>
                          </p>
                        }
                        value={values.residence}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.residence && !!errors.residence}
                        helperText={touched.residence && errors.residence}
                        sx={TextFieldStyle}
                      />
                      <TextField
                        type="text"
                        name="password"
                        label={
                          <p style={{ margin: "0" }}>
                            password<span style={{ color: "#ff0000" }}>*</span>
                          </p>
                        }
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        sx={TextFieldStyle}
                      />
                    </Box>
                    <Box
                      borderLeft="1px dashed"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      marginLeft="20%"
                    />
                    <Box ml="1rem">
                      <p style={{ fontWeight: "600", fontSize: "1.6rem" }}>
                        Others
                      </p>
                      <FormControl sx={{ width: 300, mb: "1.5rem" }}>
                        <InputLabel id="assign-class">
                          <p
                            style={{
                              margin: "0",
                              fontFamily: "Amaranth",
                              fontStyle: "italic",
                            }}
                          >
                            Assign Class
                          </p>
                        </InputLabel>
                        <Select
                          labelId="assign-class"
                          id="demo-multiple-checkbox"
                          multiple
                          value={values.level}
                          onChange={(event) => {
                            const selectedClasses = event.target.value;
                            setFieldValue("level", selectedClasses);
                          }}
                          input={<OutlinedInput label="Assign Class" />}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 48 * 4.5 + 8,
                                width: 150,
                              },
                            },
                          }}
                        >
                          {levels?.map((level) => {
                            return (
                              <MenuItem key={level.id} value={level.name}>
                                <Checkbox
                                  checked={values.level.includes(level.name)}
                                />
                                <ListItemText primary={level.name} />
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
  
                  <Button
                    variant="contained"
                    type="submit"
                    style={{
                      textTransform: "capitalize",
                      backgroundColor: "#1494A6",
                      borderRadius: "0.625rem",
                      width: "50%",
                      alignSelf: "center",
                      margin: "0.5rem 0 0.5rem 0",
                    }}
                    disabled={isSubmitting}
                  >
                    <p
                      style={{
                        margin: "0px",
                        fontFamily: "Rubik",
                        fontWeight: "bold",
                      }}
                    >
                      Create Student
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
  
  export default AddStudent;
  