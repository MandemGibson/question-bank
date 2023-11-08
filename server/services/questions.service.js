const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function getQuestions() {
  return await prisma.topic.findMany({
    include: {
      questions: {
        include: { answerChoices: true }
      },
      category: true
    }
  });
}

async function getQuestionById(id) {
  return await prisma.topic.findUnique({
    where: {
      id
    },
    include: {
      questions: {
        include: {
          answerChoices: true
        }
      }
    }
  });
}

async function createTopic({ data, questionTexts }) {
  const { id } = await prisma.topic.create({
    data: data
  });

  for (const { question, answerChoices } of questionTexts) {
    await createQuestion({
      questionData: { topicId: id, question },
      answerChoices
    });
  }

  return await getQuestionById(id);
}

async function createQuestion({ questionData, answerChoices }) {
  return await prisma.question.create({
    data: {
      ...questionData,
      answerChoices: {
        createMany: {
          data: answerChoices
        }
      }
    }
  });
}

async function deleteQuestionById(id) {
  return await prisma.topic.delete({
    where: {
      id
    }
  });
}

async function updateQuestionById({ id, question, answerChoices }) {
  for (const answerChoice of answerChoices) {
    await prisma.answerChoice.update({
      where: {
        id: answerChoice.id
      },
      data: answerChoice
    });
  }

  return await prisma.question.update({
    where: {
      id
    },
    data: {
      question
    },
    include: {
      answerChoices: true
    }
  });
}

module.exports = {
  createTopic,
  getQuestions,
  createQuestion,
  getQuestionById,
  deleteQuestionById,
  updateQuestionById
};
