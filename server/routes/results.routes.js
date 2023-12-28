const {
  getResultHandler,
  createResultHandler
} = require("../controllers/results.controller");
const { isStudent } = require("../middleware/role");

const resultRouter = require("express").Router();

resultRouter.get("/", getResultHandler);
resultRouter.post("/", isStudent, createResultHandler);

module.exports = resultRouter;
