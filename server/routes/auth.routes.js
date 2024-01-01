const {
  loginHandler,
  logoutHandler,
  requestOTPHandler,
  verifyOTPHandler,
  resetPasswordHandler,
} = require("../controllers/auth.controller");
const requireUser = require("../middleware/requireUser");
const { noUser } = require("../middleware/role");

const authRouter = require("express").Router();

authRouter.post("/login", noUser, loginHandler);
authRouter.post("/request-otp", noUser, requestOTPHandler);
authRouter.post("/verify-otp", noUser, verifyOTPHandler);
authRouter.post("/reset-password", noUser, resetPasswordHandler);

authRouter.post("/logout", requireUser, logoutHandler);

module.exports = authRouter;
