const MESSAGE = {
  message: 'You are unauthorised to access this endpoint'
}

async function isSuperAdmin(req, res, next) {
  if (res.locals.user.role !== 7832)
    return res.status(403).json(MESSAGE);

  return next();
}

async function isAdmin(req, res, next) {
  if (res.locals.user.role !== 9291)
    return res.status(403).json(MESSAGE);

  return next();
}

async function isAdminOrSuperAdmin(req, res, next) {
  const { role } = res.locals.user
  if (role !== 9291 || role !== 7832)
    return res.status(403).json(MESSAGE);

  return next();
}

async function isStaff(req, res, next) {
  if (res.locals.user.role !== 3921)
    return res.status(403).json(MESSAGE);

  return next();
}

async function isStudent(req, res, next) {
  if (res.locals.user.role !== 6631)
    return res.status(403).json(MESSAGE);

  return next();
}

async function noUser(req, res, next) {
  if (res.locals.user) return res.status(403).json(MESSAGE);

  return next();
}

module.exports = {
  noUser,
  isAdmin,
  isStaff,
  isStudent,
  isSuperAdmin,
  isAdminOrSuperAdmin,
};
