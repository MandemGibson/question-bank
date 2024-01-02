const crypto = require('crypto')
const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function createResetToken(userId) {
    const token = crypto.randomBytes(16).toString('hex')

    return await prisma.resetTokens.create({
        data: {
            token,
            userId,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString()
        },
        select: {
            token: true
        }
    })
}

async function findResetToken(filter) {
    return await prisma.resetTokens.findFirst({
        where: {
            ...filter,
            valid: true,
            expiresAt: {
                gt: new Date(),
            }
        }
    })
}

async function invalidateResetToken(id) {
    return await prisma.resetTokens.update({
        where: {
            id,
        },
        data: {
            valid: false
        }
    })
}

module.exports = {
    findResetToken,
    createResetToken,
    invalidateResetToken,
}