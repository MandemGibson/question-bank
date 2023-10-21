const { getAllStudentsHandler } = require("../controllers/students.controller");

const studentRouter = require("express").Router();

studentRouter.get("/", getAllStudentsHandler);

module.exports = studentRouter
