const {
  getResultHandler,
  createResultHandler
} = require("../controllers/results.controller");

const resultRouter = require("express").Router();

resultRouter.get("/", getResultHandler);
resultRouter.post("/", createResultHandler);

module.exports = resultRouter;
