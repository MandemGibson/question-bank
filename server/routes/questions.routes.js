const { getQuestionsHandler, getQuestionByIdHandler, createQuestionsHandler, deleteQuestionsHandler, updateQuestionHandler, flagQuestionHandler } = require("../controllers/questions.controllers");
const { isStaff, isStudent } = require("../middleware/role");

const questionRouter = require("express").Router();

questionRouter.get("/", getQuestionsHandler);

questionRouter.get("/:id", getQuestionByIdHandler);

questionRouter.post("/", isStaff, createQuestionsHandler);

questionRouter.delete("/:id", isStaff, deleteQuestionsHandler);

questionRouter.patch("/:id", isStaff, updateQuestionHandler);

questionRouter.patch("/:id/flag", isStudent, flagQuestionHandler);

module.exports = questionRouter