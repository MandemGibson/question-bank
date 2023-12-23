const { getCompletedTopicsHandler } = require("../controllers/completedTopics.controller");

const completedTopicsRouter = require("express").Router();

completedTopicsRouter.get("/", getCompletedTopicsHandler);

module.exports = completedTopicsRouter;
