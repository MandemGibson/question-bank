const { getQuestionsHandler, getQuestionByIdHandler, createQuestionsHandler, deleteQuestionsHandler, updateQuestionHandler } = require("../controllers/questions.controllers");

const questionRouter = require("express").Router();

questionRouter.get("/questions", getQuestionsHandler);

questionRouter.get("/questions/:id", getQuestionByIdHandler);

questionRouter.post("/questions", createQuestionsHandler);

questionRouter.delete("/questions/:id", deleteQuestionsHandler);

questionRouter.patch("/questions/:id", updateQuestionHandler);

module.exports = questionRouter