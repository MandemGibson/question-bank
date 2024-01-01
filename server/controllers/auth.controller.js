const { logoutUser, loginUser, updatePassword } = require("../services/auth.service");
const { findOTP, createOTP, invalidateOTP } = require("../services/otp.service");
const { createResetToken, findResetToken } = require("../services/resetToken.service");
const {
  createSession,
  getSessionByUserId,
} = require("../services/sessions.service");
const { getStaffById } = require("../services/staffs.service");
const { createPassword } = require("../util/password");
const sendOTP = require("../util/sendOTP");

async function loginHandler(req, res, next) {
  try {
    const { userId, password } = req.body;

    const auth = await loginUser({ userId, password });

    if (!auth)
      return res.status(400).json({ message: "Invalid userId or password" });

    const { id } =
      (await getSessionByUserId({
        userId: auth.staff_id ?? auth.user_id ?? auth.id,
        ip: req.ip,
      })) ??
      (await createSession({
        userId: auth.staff_id ?? auth.user_id ?? auth.id,
        ip: req.ip,
      }));

    return res.status(200).json({
      user: auth,
      sessionId: id,
    });
  } catch (error) {
    next(error);
  }
}

async function requestOTPHandler(req, res, next) {
  try {
    const { staffId } = req.body

    const staff = await getStaffById({ staff_id: staffId })

    if (!staff) return res.status(404).json({ message: 'Staff does not exist' })

    let otp = await findOTP({ staffId: staff.staff_id })

    if (!otp)
      otp = await createOTP(staff.staff_id)

    await sendOTP({ otp: otp.otp, recipient: staff.email })

    res.status(200).json({
      message: 'OTP sent!',
    })

  } catch (e) {

    console.log(e);
    next(e)
  }
}


async function verifyOTPHandler(req, res, next) {
  try {
    const { staffId, otp } = req.body

    const validOTP = await findOTP({ staffId, otp })

    if (!validOTP) return res.status(400).json({
      message: 'Invalid OTP!'
    })

    const resetToken = await createResetToken(staffId)

    await invalidateOTP(validOTP.id)

    res.send(200).json({
      token: resetToken.token,
    })

  } catch (e) {
    next(e)
  }
}

async function resetPasswordHandler(req, res, next) {
  try {
    const { token, password } = req.body

    const resetToken = await findResetToken(token)

    if (!resetToken) return res.status(400).json({
      message: 'Token invalid. Please request for an otp again',
    })

    const encryptedPassword = await createPassword(password)

    await updatePassword({ userId: resetToken.userId, password: encryptedPassword })

    return res.sendStatus(200)
  } catch (error) {
    next(e)
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
  verifyOTPHandler,
  requestOTPHandler,
  resetPasswordHandler,
};
