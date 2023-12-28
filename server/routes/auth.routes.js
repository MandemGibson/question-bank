const {
  loginHandler,
  logoutHandler,
} = require("../controllers/auth.controller");
const requireUser = require("../middleware/requireUser");
const { noUser } = require("../middleware/role");

const authRouter = require("express").Router();

authRouter.post("/login", noUser, loginHandler);

authRouter.post("/logout", requireUser, logoutHandler);

module.exports = authRouter;
