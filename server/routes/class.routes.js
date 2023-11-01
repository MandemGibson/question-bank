const getClassHandler = require("../controllers/class.controller");

const classRouter = require("express").Router();

classRouter.get("/", getClassHandler);

module.exports = classRouter;
