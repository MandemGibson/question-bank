const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function isClassCompleted(classId, topicId) {
  // Count the number of students in the class
  const totalStudents = await prisma.student.count({
    where: {
      classId
    }
  });

  // Count the number of completed topics for the class and topic
  const completedTopicsCount = await prisma.completedTopics.count({
    where: {
      topicId,
      student: {
        classId
      }
    }
  });

  // Check if all students in the class have completed the questions
  return totalStudents === completedTopicsCount;
}

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
  studentId,
  classId
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

  if (isCompleted) {
    // Check if all students in the class have completed the questions
    const classCompleted = await isClassCompleted(classId, topicId);

    // Update the isCompleted field of the topic if all students have completed
    if (classCompleted) {
      await prisma.topic.update({
        where: {
          id: topicId
        },
        data: {
          isDone: true
        }
      });
    }

    // Create a completed topic entry for the specific student
    await prisma.completedTopics.create({
      data: {
        topicId,
        studentId
      }
    });
  }
}

module.exports = {
  createTopic,
  getQuestions,
  createQuestion,
  getQuestionById,
  deleteQuestionById,
  updateQuestionById
};
