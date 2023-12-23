const { getCompletedTopics } = require("../services/completedTopics.service");


async function getCompletedTopicsHandler(req, res, next) {
  try {
    const completedTopics = await getCompletedTopics(res.locals.user.id);
    res.json(completedTopics);
  } catch (error) {
    next();
  }
}

module.exports = {
  getCompletedTopicsHandler
};
