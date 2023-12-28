const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function getValidSession() {
  return await prisma.sessions.findMany({
    valid: true
  });
}

async function getSessionById({ id, ip }) {
  return await prisma.sessions.findFirst({
    where: {
      id,
      ip,
      valid: true
    }
  });
}

async function getSessionByUserId({ userId, ip }) {
  return await prisma.sessions.findFirst({
    where: {
      userId,
      ip,
      valid: true
    }
  });
}

async function createSession({ userId, ip }) {
  return await prisma.sessions.create({
    data: {
      userId,
      ip
    }
  });
}

module.exports = {
  createSession,
  getSessionById,
  getSessionByUserId,
  getValidSession
};
