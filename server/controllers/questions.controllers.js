const {
  getQuestions,
  getQuestionById,
  deleteQuestionById,
  updateQuestionById,
  createTopic,
  flagQuestion,
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
    // console.log(res.locals.user);
    const topicData = {
      title: title,
      timeLimit: timeLimit,
      deadline: new Date(deadline),
      categoryId: categoryId,
      classId: classId,
      staffId: res.locals.user.id
    };

    // if (questionTexts.image) {
    //   questionTexts.image = Buffer.from(questionTexts.image, "base64");
    // }

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
    const {
      question,
      image,
      answerChoices,
    } = req.body;

    const updatedQuestion = await updateQuestionById({
      id,
      question,
      image,
      answerChoices,
    });

    res.json(updatedQuestion);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function flagQuestionHandler(req, res, next) {
  try {
    const { id } = req.params;

    await flagQuestion(id);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  getQuestionsHandler,
  getQuestionByIdHandler,
  createQuestionsHandler,
  deleteQuestionsHandler,
  updateQuestionHandler,
  flagQuestionHandler
};
