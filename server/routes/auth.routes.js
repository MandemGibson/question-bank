const { loginHandler, logoutHandler } = require("../controllers/auth.controller");
const { noUser, loggedIn } = require("../middleware/role");

const authRouter = require("express").Router();


authRouter.post("/login", noUser, loginHandler);

authRouter.post('/logout', loggedIn, logoutHandler)

module.exports = authRouter