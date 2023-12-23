const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function getQuestions() {
  return await prisma.topic.findMany({
    include: {
      questions: {
        include: { answerChoices: true },
        orderBy: { createdAt: "asc" }
      },
      category: true,
      level: true,
      staff: true
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

  for (let { question, image, answerChoices } of questionTexts) {
    if (image) {
      image = Buffer.from(image, "base64");
    }
    await createQuestion({
      questionData: { topicId: id, question },
      image,
      answerChoices
    });
  }

  return await getQuestionById(id);
}

async function createQuestion({ questionData, questionImage, answerChoices }) {
  return await prisma.question.create({
    data: {
      ...questionData,
      questionImage,
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

async function updateQuestionById({
  id,
  question,
  answerChoices,
  isFlagged,
  isCompleted,
  topicId,
  userId
}) {
  if (answerChoices) {
    for (const answerChoice of answerChoices) {
      await prisma.answerChoice.update({
        where: {
          id: answerChoice.id
        },
        data: answerChoice
      });
    }
  } else {
    console.log("No answer choices");
  }

  await prisma.question.update({
    where: {
      id
    },
    data: {
      question,
      isFlagged
    },
    include: {
      answerChoices: true
    }
  });

  if (isCompleted)
    await prisma.topic.update({
      where: {
        id: topicId
      },
      data: {
        completed: {
          connect: { topicId, userId }
        }
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
