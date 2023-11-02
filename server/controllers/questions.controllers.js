const {
  getQuestions,
  getQuestionById,
  deleteQuestionById,
  updateQuestionById,
  createTopic
} = require("../services/questions.service");

async function getQuestionsHandler(req, res, next) {
  try {
    const questions = await getQuestions();
    res.json(questions);
  } catch (error) {
    next(error);
  }
}

async function getQuestionByIdHandler(req, res, next) {
  const { id } = req.params;
  try {
    const question = await getQuestionById(id);
    res.json(question);
  } catch (error) {
    next(error);
  }
}

async function createQuestionsHandler(req, res, next) {
  try {
    const {
      title,
      timeLimit,
      deadline,
      categoryId,
      questionTexts,
      classId
    } = req.body;

    const topicData = {
      title: title,
      timeLimit: timeLimit,
      deadline: new Date(deadline),
      categoryId: categoryId,
      classId: classId
    };

    const topic = await createTopic({ data: topicData, questionTexts });

    res.status(201).json(topic);
  } catch (error) {
    next(error);
  }
}

async function deleteQuestionsHandler(req, res, next) {
  try {
    const { id } = req.params;
    await deleteQuestionById(id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

async function updateQuestionHandler(req, res, next) {
  try {
    const { id } = req.params;
    const { question, answerChoices } = req.body;

    const updatedQuestion = await updateQuestionById({
      id,
      question,
      answerChoices
    });
    res.json(updatedQuestion);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getQuestionsHandler,
  getQuestionByIdHandler,
  createQuestionsHandler,
  deleteQuestionsHandler,
  updateQuestionHandler
};
