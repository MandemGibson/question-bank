const PrismaService = require("./prisma.service");

const prisma = PrismaService

async function getAuth(userId) {
    return await prisma.auth.findUnique({
        where: {
            userId
        }
    })
}

async function logoutUser(id) {
    return await prisma.sessions.update({
        where: {
            id
        },
        data: {
            valid: false
        }
    })
}

module.exports = {
    getAuth,
    logoutUser
}