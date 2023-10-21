const { getAdminById } = require("../services/admin.service")
const { getSessionById } = require("../services/sessions.service")
const { getStaffById } = require("../services/staffs.service")
const { getStudentById } = require("../services/students.service")

async function deserialiseUser(req, res, next) {
    try {
        const sessionId = req.get('Authorization').replace('Bearer ', '')
        const ip = req.ip

        const session = await getSessionById({ id: sessionId, ip })

        if (!session) return next()

        const user = await getStaffById(session.userId) ?? await getStudentById(session.userId) ?? await getAdminById(session.userId)

        if (!user) return next()

        res.locals.user = user

        return next()
    } catch (error) {
        next(error)
    }
}

module.exports = deserialiseUser