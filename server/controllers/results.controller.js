const { createResult, getResult } = require("../services/result.service");

async function getResultHandler(req, res, next) {
  try {
    const result = await getResult();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function createResultHandler(req, res, next) {
  try {
    const { result, categoryId, title, topicId, isCompleted } = req.body;
    const { id, classId } = res.locals.user;
    const results = await createResult({
      data: {
        result,
        categoryId,
        studentId: id,
        title
      },
      topicId,
      isCompleted,
      studentId: id,
      classId
    });
    res.status(201).json(results);
  } catch (error) {
    next(error);
  }
}

module.exports = { createResultHandler, getResultHandler };
