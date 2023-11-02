const getSubjectHandler = require("../controllers/subject.controller");

const subjectRouter = require("express").Router();

subjectRouter.get("/", getSubjectHandler);

module.exports = subjectRouter;
