require("dotenv").config();

const apiRouter = require("express").Router();

const staffRouter = require("./staffs.routes");
const questionRouter = require("./questions.routes");
const studentRouter = require("./students.routes");
const { isAdmin } = require("../middleware/role");
const adminRouter = require("./admin.routes");
const authRouter = require("./auth.routes");

apiRouter.use("/staffs", staffRouter);
apiRouter.use("/admin", isAdmin, adminRouter);
apiRouter.use("/questions", questionRouter);
apiRouter.use("/students", isAdmin, studentRouter);
apiRouter.use("/auth", authRouter);

module.exports = apiRouter;
