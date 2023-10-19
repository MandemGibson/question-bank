const { getQuestionsHandler, getQuestionByIdHandler, createQuestionsHandler, deleteQuestionsHandler, updateQuestionHandler } = require("../controllers/questions.controllers");

const questionRouter = require("express").Router();

questionRouter.get("/", getQuestionsHandler);

questionRouter.get("/:id", getQuestionByIdHandler);

questionRouter.post("/", createQuestionsHandler);

questionRouter.delete("/:id", deleteQuestionsHandler);

questionRouter.patch("/:id", updateQuestionHandler);

module.exports = questionRouter