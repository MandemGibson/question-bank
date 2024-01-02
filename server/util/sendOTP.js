const { createTransport } = require("nodemailer");

async function sendOTP({ otp, recipient }) {
  const user = process.env.NODEMAILER_EMAIL;
  const pass = process.env.NODEMAILER_PASSWORD;

  const body = `<p>The reset password OTP is ${otp}<p>`;

  const transporter = createTransport({
    service: "gmail",
    auth: {
      user,
      pass
    }
  });

  const mailOptions = {
    from: `Question bank`,
    to: recipient,
    subject: "Reset password otp",
    html: body
  };

  return await transporter.sendMail(mailOptions);
}

module.exports = sendOTP;
