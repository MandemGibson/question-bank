async function isAdmin(req, res, next) {
  console.log("isAdmin middleware started"); // Add this
  if (!res.locals.user || res.locals.user.role !== 9291) {
    console.log("User is not an admin"); // Add this
    return res.sendStatus(403);
  }
  console.log("User is an admin"); // Add this
  return next();
}

async function isStaff(req, res, next) {
  if (!res.locals.user || res.locals.user.role !== 3921)
    return res.sendStatus(403);

  return next();
}

async function isStudent(req, res, next) {
  if (!res.locals.user || res.locals.user.role !== 6631)
    return res.sendStatus(403);

  return next();
}

async function noUser(req, res, next) {
  if (res.locals.user) return res.sendStatus(403);

  return next();
}

async function loggedIn(req, res, next) {
  if (!res.locals.user) return res.sendStatus(403);

  return next();
}

module.exports = {
  noUser,
  isAdmin,
  isStaff,
  loggedIn,
  isStudent,
};
