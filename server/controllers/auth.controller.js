const { logoutUser, loginUser } = require("../services/auth.service");
const { createSession, getSessionByUserId } = require("../services/sessions.service");

async function loginHandler(req, res, next) {
    try {
        const { userId, password } = req.body;

        const auth = await loginUser({ userId, password })

        if (!auth) return res.status(400).json({ message: 'Invalid userId or password' })

        const { id } = await getSessionByUserId({ userId: auth.staff_id ?? auth.user_id ?? auth.id, ip: req.ip }) ?? await createSession({ userId: auth.staff_id ?? auth.user_id ?? auth.id, ip: req.ip })

        return res.status(200).json({
            user: auth,
            sessionId: id
        })

    } catch (error) {
        next(error);
    }
}

async function logoutHandler(req, res, next) {
    try {
        const sessionId = req.get('Authorization').replace('Bearer ', '')

        await logoutUser(sessionId)

        return res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    loginHandler,
    logoutHandler
}