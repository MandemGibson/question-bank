const PrismaService = require("./prisma.service");
const { createPassword, decryptPassword } = require("../util/password");

const prisma = PrismaService

async function getAdmins() {
    return await prisma.admin.findMany()
}

async function getAdmin(filter) {
    return await prisma.admin.findFirst({
        where: filter
    })
}

async function loginAdmin({ username, password }) {
    const admin = await getAdmin({ username })

    console.log(username, password);

    if (!admin) return undefined

    const validPassword = await decryptPassword(password, admin.password)

    if (!validPassword) return undefined

    return admin
}

async function createAdmin() {
    const admin = await getAdmins()

    if (admin?.length !== 0) return

    const password = await createPassword('admin')

    return await prisma.admin.create({
        data: {
            username: 'admin',
            password
        }
    })
}

module.exports = {
    getAdmins,
    loginAdmin,
    createAdmin,
}