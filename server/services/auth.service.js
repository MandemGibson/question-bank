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
    let auth = await getAuth(userId)

    if (!auth) auth = await loginAdmin({ username: userId, password })

    if (auth.role) return auth

    if (!auth) return undefined

    const isEqual = await decryptPassword(password, auth.password)

    if (!isEqual) return undefined

    const user = await getStudentById(auth.userId) ?? await getStaffById(auth.userId)

    if (!user) return undefined

    return user
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