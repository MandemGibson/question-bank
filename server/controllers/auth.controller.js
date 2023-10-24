const { getAuth, logoutUser } = require("../services/auth.service");
const {
  createSession,
  getSessionByUserId,
} = require("../services/sessions.service");
const { getStaffById } = require("../services/staffs.service");
const { getStudentById } = require("../services/students.service");
const { decryptPassword } = require("../util/password");

async function loginHandler(req, res, next) {
  try {
    const { userId, password } = req.body;

    const auth = await getAuth(userId);

    if (!auth)
      return res.status(400).json({ message: "Invalid userId or password" });

    const isEqual = await decryptPassword(password, auth.password);

    if (!isEqual)
      return res.status(400).json({ message: "Invalid userId or password" });

    const user =
      (await getStudentById(auth.userId)) ?? (await getStaffById(auth.userId));

    if (!user)
      return res.status(400).json({ message: "Invalid userId or password" });

    const { id } =
      (await getSessionByUserId({ userId, ip: req.ip })) ??
      (await createSession({ userId, ip: req.ip }));

    return res.status(200).json({
      user: user,
      sessionId: id,
    });
  } catch (error) {
    next(error);
  }
}

async function logoutHandler(req, res, next) {
  try {
    const sessionId = req.get("Authorization").replace("Bearer ", "");

    await logoutUser(sessionId);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  loginHandler,
  logoutHandler,
};
