const PrismaService = require("./prisma.service");

const prisma = PrismaService

async function getSessionById({ id, ip }) {
    return await prisma.sessions.findFirst({
        where: {
            id,
            ip
        }
    })
}

async function createSession({ userId, ip }) {
    return await prisma.sessions.create({
        data: {
            userId,
            ip
        }
    })
}

module.exports = {
    createSession,
    getSessionById,
}