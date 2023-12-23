require("dotenv").config();

const apiRouter = require("express").Router();

const staffRouter = require("./staffs.routes");
const questionRouter = require("./questions.routes");
const studentRouter = require("./students.routes");
const { isAdmin } = require("../middleware/role");
const authRouter = require("./auth.routes");
const classRouter = require("./class.routes");
const subjectRouter = require("./subjects.routes");
const resultRouter = require("./results.routes");
const sessionRouter = require("./sessions.routes.js");
const completedTopicsRouter = require("./completedTopics.routes.js");

apiRouter.use("/staffs", staffRouter);
apiRouter.use("/questions", questionRouter);
apiRouter.use("/students", studentRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/levels", classRouter);
apiRouter.use("/subjects", subjectRouter);
apiRouter.use("/results", resultRouter);
apiRouter.use("/sessions", sessionRouter);
apiRouter.use("/completedTopics", completedTopicsRouter);

module.exports = apiRouter;
