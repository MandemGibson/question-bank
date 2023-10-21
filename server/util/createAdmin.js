const PrismaService = require("../services/prisma.service");
const { createPassword } = require("./password");

const prisma = PrismaService

async function createAdmin() {
    const admin = await prisma.admin.findMany()

    if (admin.length !== 0) return

    const password = await createPassword('admin')

    return await prisma.admin.create({
        data: {
            username: 'admin',
            password
        }
    })
}

module.exports = createAdmin