const {
  getQuestions,
  getQuestionById,
  deleteQuestionById,
  updateQuestionById,
  createQuestions,
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
    const data = req.body;

    const topicData = {
      classId: data.classId,
      title: data.title,
      timeLimit: data.timeLimit,
      deadline: new Date(data.deadline),
      categoryId: data.categoryId,
    };

    const topic = await createQuestions({ data: topicData, questionTexts });

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
      answerChoices,
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
  updateQuestionHandler,
};
