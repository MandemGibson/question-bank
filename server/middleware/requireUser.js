function requireUser(req, res, next) {
    if (!res.locals.user) return res.status(403).json({
        message: 'You are unauthorised to access this endpoint'
    })

    return next()
}

module.exports = requireUser