const { getCompletedTopics } = require("../services/completedTopics.service");


async function getCompletedTopicsHandler(req, res, next) {
  try {
    const completedTopic = await getCompletedTopics({ userId: res.locals.user.id, topicId: req.query.topicId });
    const isCompleted = completedTopic ? true : false
    res.json({ isCompleted });
  } catch (error) {
    next();
  }
}

module.exports = {
  getCompletedTopicsHandler
};
