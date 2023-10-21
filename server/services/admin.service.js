const PrismaService = require("./prisma.service");
const { createPassword } = require("../util/password");

const prisma = PrismaService

async function getAdmin() {
    return await prisma.admin.findMany()
}

async function getAdminById(id) {
    return await prisma.admin.findUnique({
        where: {
            id
        }
    })
}

async function createAdmin() {
    const admin = await getAdmin()

    if (admin.length !== 0) return

    const password = await createPassword('admin')

    return await prisma.admin.create({
        data: {
            username: 'admin',
            password
        }
    })
}

module.exports = {
    createAdmin,
    getAdminById
}