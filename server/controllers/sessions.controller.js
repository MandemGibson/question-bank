const { getSession } = require("../services/sessions.service");

async function getSessionHandler(req, res, next) {
  try {
    const sessions = await getSession();
    res.json(sessions);
  } catch (error) {
    next(error);
  }
}

module.exports = getSessionHandler;
