const crypto = require("crypto");
const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function createOTP(recipient) {
  const otp = crypto.randomInt(100000, 999999);

  return await prisma.otp.create({
    data: {
      otp,
      email: recipient,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString()
    }
  });
}

async function findOTP({ recipient, otp }) {
  return await prisma.otp.findFirst({
    where: {
      otp,
      email: recipient,
      valid: true,
      expiresAt: {
        gt: new Date()
      }
    }
  });
}

async function invalidateOTP(id) {
  return prisma.otp.update({
    where: {
      id
    },
    data: {
      valid: false
    }
  });
}

module.exports = {
  findOTP,
  createOTP,
  invalidateOTP
};
