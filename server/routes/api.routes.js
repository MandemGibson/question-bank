require("dotenv").config();

const apiRouter = require("express").Router();

const staffRouter = require("./staffs.routes");
const questionRouter = require("./questions.routes");
const studentRouter = require("./students.routes");
const { isAdminOrSuperAdmin } = require("../middleware/role");
const authRouter = require("./auth.routes");
const classRouter = require("./class.routes");
const subjectRouter = require("./subjects.routes");
const resultRouter = require("./results.routes");
const sessionRouter = require("./sessions.routes.js");
const completedTopicsRouter = require("./completedTopics.routes.js");
const requireUser = require("../middleware/requireUser.js");

apiRouter.use("/staffs", [requireUser, isAdminOrSuperAdmin], staffRouter);
apiRouter.use("/questions", requireUser, questionRouter);
apiRouter.use("/students", [requireUser, isAdminOrSuperAdmin], studentRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/levels", [requireUser, isAdminOrSuperAdmin], classRouter);
apiRouter.use("/subjects", [requireUser, isAdminOrSuperAdmin], subjectRouter);
apiRouter.use("/results", requireUser, resultRouter);
apiRouter.use("/sessions", [requireUser, isAdminOrSuperAdmin], sessionRouter);
apiRouter.use("/completedTopics", requireUser, completedTopicsRouter);

module.exports = apiRouter;
