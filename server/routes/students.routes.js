const {
  getAllStudentsHandler,
  createStudentHandler,
  updateStudentHandler
} = require("../controllers/students.controller");

const studentRouter = require("express").Router();

studentRouter.get("/", getAllStudentsHandler);
studentRouter.post("/", createStudentHandler);
studentRouter.patch("/:id", updateStudentHandler);

module.exports = studentRouter;
