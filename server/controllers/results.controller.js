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
    const data = req.body;
    const result = await createResult({ data });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { createResultHandler, getResultHandler };
