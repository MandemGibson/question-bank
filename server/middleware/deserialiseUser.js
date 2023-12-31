const { getAdmin } = require("../services/admin.service");
const { getSessionById } = require("../services/sessions.service");
const { getStaffById } = require("../services/staffs.service");
const { getStudentById } = require("../services/students.service");
const { getSuperAdmin } = require("../services/superadmin.service");

async function deserialiseUser(req, res, next) {
  try {
    const sessionId = req.get("Authorization")?.replace("Bearer ", "");
    const ip = req.ip;

    if (!sessionId) return next();

    const session = await getSessionById({ id: sessionId, ip });

    if (!session) return next();

    const user =
      (await getStaffById({ staff_id: session.userId })) ??
      (await getStudentById({ id: session.userId })) ??
      (await getAdmin({ id: session.userId })) ??
      (await getSuperAdmin({ id: session.userId }));

    if (!user) return next();

    res.locals.user = user;

    return next();
  } catch (error) {
    next(error);
  }
}

module.exports = deserialiseUser;
