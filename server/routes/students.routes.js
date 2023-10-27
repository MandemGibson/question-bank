const {
  getAllStudentsHandler,
  createStudentHandler,
} = require("../controllers/students.controller");

const studentRouter = require("express").Router();

studentRouter.get("/", getAllStudentsHandler);
studentRouter.post("/", createStudentHandler);

module.exports = studentRouter;
