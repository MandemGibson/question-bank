async function isAdmin(req, res, next) {
    return res.locals.user.role === 9291
}

async function isStaff(req, res, next) {
    return res.locals.user.role === 3921
}

async function isStudent(req, res, next) {
    return res.locals.user.role === 6631
}