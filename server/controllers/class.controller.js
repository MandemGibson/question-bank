const { getClass } = require("../services/class.service");

async function getClassHandler(req, res, next) {
  try {
    const level = await getClass();
    res.json(level);
  } catch (error) {
    next();
  }
}

module.exports = getClassHandler;
