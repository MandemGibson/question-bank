require("dotenv").config();

const apiRouter = require("express").Router();

const staffRouter = require("./staffs.routes");
const questionRouter = require("./questions.routes");
const studentRouter = require("./students.routes");
const { isAdmin } = require("../middleware/role");
const authRouter = require("./auth.routes");
const classRouter = require("./class.routes");
const subjectRouter = require("./subjects.routes");

apiRouter.use("/staffs", staffRouter);
apiRouter.use("/questions", questionRouter);
apiRouter.use("/students", studentRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/levels", classRouter);
apiRouter.use("/subjects", subjectRouter);

module.exports = apiRouter;
