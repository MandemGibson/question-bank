const { loginAdmin } = require("./admin.service");
const PrismaService = require("./prisma.service");

const prisma = PrismaService

async function getAuth(userId) {
    return await prisma.auth.findUnique({
        where: {
            userId
        }
    })
}

async function loginUser({ userId, password }) {
    let auth = await getAuth(userId) ?? await loginAdmin({ username: userId, password })

    if (!auth) return undefined

    if (auth.role) return auth

    const isEqual = await decryptPassword(password, auth.password)

    if (!isEqual) return undefined

    return await getStudentById(auth.userId) ?? await getStaffById(auth.userId) ?? undefined

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
    loginUser,
    logoutUser
}