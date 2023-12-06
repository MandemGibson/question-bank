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
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { selectClass } from "../../../features/classSlice";
import { selectSubject } from "../../../features/subjectSlice";
import axios from "axios";
import { useDropzone } from "react-dropzone";


const initialValues = {
  firstname: "",
  middlename: "",
  lastname: "",
  email: "",
  primary_contact: "",
  secondary_contact: "",
  dob: "",
  residence: "",
  password: "",
  level: [],
  subjects: [],
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const CONTACT_REGEX = /^\d{10}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const userSchema = yup.object().shape({
  firstname: yup.string().required("required"),
  lastname: yup.string().required("required"),
  email: yup
    .string()
    .matches(EMAIL_REGEX, "Enter a valid email")
    .required("required"),
  primary_contact: yup
    .string()
    .matches(CONTACT_REGEX, "Phone number not valid")
    .required("required"),
  secondary_contact: yup
    .string()
    .matches(CONTACT_REGEX, "Phone number is not valid"),
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

function AddStaff() {
  const levels = useSelector(selectClass);
  const subjects = useSelector(selectSubject); 
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("No image selected");

  useEffect(() => {
    console.log("File", file)
    console.log("Filename", filename)
  })

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
  
    if (file) {
      setFilename(file.name);
  
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        // Do something with the file content, e.g., save it in state
        setFile(fileContent);
      };
  
      reader.readAsText(file); // You can use readAsDataURL for images, readAsArrayBuffer for binary files, etc.
    }
  };
  

  // Use the useDropzone hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".xlsx, .xls, .doc, .docx", // Specify accepted file types
  });

  const handleCreateStaff = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3005/api/staffs",
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
      <Box bgcolor="white" width="100%" pr={1}>
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
              // fontFamily: "Amaranth",
              // fontStyle: "italic",
              // color: "gray",
              fontWeight: "600",
            },
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleCreateStaff(values);
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
                <Box display="flex" flexDirection="column">
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <p style={{ fontWeight: "600", fontSize: "1.6rem" }}>
                      Profile
                    </p>
                    <div {...getRootProps()} style={{ marginLeft: "10px" }}>
                      <input {...getInputProps()} />
                      <Button>
                        {isDragActive ? "Drop the file here" : "Upload file"}
                      </Button>
                    </div>
                    <p>{filename}</p>
                  </Box>

                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
                    gap={1}
                  >
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
                    <TextField
                      fullWidth
                      type="email"
                      name="email"
                      label={
                        <p style={{ margin: "0" }}>
                          email<span style={{ color: "#ff0000" }}>*</span>
                        </p>
                      }
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={TextFieldStyle}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      name="primary_contact"
                      label={
                        <p style={{ margin: "0" }}>
                          primary contact
                          <span style={{ color: "#ff0000" }}>*</span>
                        </p>
                      }
                      value={values.primary_contact}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched.primary_contact && !!errors.primary_contact
                      }
                      helperText={
                        touched.primary_contact && errors.primary_contact
                      }
                      sx={TextFieldStyle}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      name="secondary_contact"
                      label="secondary_contact"
                      value={values.secondary_contact}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched.secondary_contact &&
                        !!errors.secondary_contact
                      }
                      helperText={
                        touched.secondary_contact && errors.secondary_contact
                      }
                      sx={TextFieldStyle}
                    />
                    <Box>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="date"
                        label={
                          <p
                            style={{
                              margin: "0",
                              backgroundColor: "white",
                            }}
                          >
                            date of birth
                            <span style={{ color: "#ff0000" }}>*</span>
                          </p>
                        }
                        name="dob"
                        value={values.dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.dob && !!errors.dob}
                        helperText={touched.dob && errors.dob}
                        sx={TextFieldStyle}
                      />
                    </Box>
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

                  <Box>
                    <p style={{ fontWeight: "600", fontSize: "1.6rem" }}>
                      Others
                    </p>
                    <Box justifyContent="">
                      <FormControl
                        sx={{ width: 300, mb: "1.5rem", mr: "1.5rem" }}
                      >
                        <InputLabel id="assign-class">
                          <p
                            style={{
                              margin: "0",
                              // fontFamily: "Amaranth",
                              // fontStyle: "italic",
                            }}
                          >
                            Assign Class(es)
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
                          input={<OutlinedInput label="Assign Class(es)" />}
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

                      <FormControl sx={{ width: 300 }}>
                        <InputLabel id="assign-subject">
                          <p
                            style={{
                              margin: "0",
                              // fontFamily: "Amaranth",
                              // fontStyle: "italic",
                            }}
                          >
                            Assign Subject(s)
                          </p>
                        </InputLabel>
                        <Select
                          labelId="assign-subject"
                          id="demo-multiple-checkbox"
                          multiple
                          value={values.subjects}
                          onChange={(event) => {
                            const selectedClasses = event.target.value;
                            setFieldValue("subjects", selectedClasses);
                          }}
                          input={<OutlinedInput label="Assign Subject(s)" />}
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
                          {subjects.map((subject) => {
                            return (
                              <MenuItem key={subject.id} value={subject.name}>
                                <Checkbox
                                  checked={values.subjects.includes(
                                    subject.name
                                  )}
                                />
                                <ListItemText primary={subject.name} />
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Box>
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
                    Create Staff
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

export default AddStaff;
