const { getSubjects } = require("../services/subjects.service");

async function getSubjectHandler(req, res, next) {
  try {
    const subject = await getSubjects();
    res.json(subject);
  } catch (error) {
    next();
  }
}

module.exports = getSubjectHandler;
