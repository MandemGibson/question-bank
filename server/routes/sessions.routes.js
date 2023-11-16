const getSessionHandler = require("../controllers/sessions.controller");
const sessionRouter = require("express").Router();

sessionRouter.get("/", getSessionHandler);

module.exports = sessionRouter;
