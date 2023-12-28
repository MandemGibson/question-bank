const PrismaService = require("./prisma.service");
const { completeTopic } = require("./topic.service");
const { countStudentsInClass } = require("./students.service");
const { countCompletedTopics, addCompletedTopic } = require("./completedTopics.service");

const prisma = PrismaService;

async function isClassCompleted(classId, topicId) {
  // Count the number of students in the class
  const totalStudents = await countStudentsInClass(classId)

  // Count the number of completed topics for the class and topic
  const completedTopicsCount = await countCompletedTopics({ topicId, classId })

  // Check if all students in the class have completed the questions
  return totalStudents === completedTopicsCount;
}

async function getResult() {
  return await prisma.results.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      student: {
        include: { level: true }
      },
      category: true
    }
  });
}

async function createResult({ data, topicId, studentId, isCompleted, classId }) {
  const results = await prisma.results.create({
    data
  });

  if (isCompleted) {
    // Create a completed topic entry for the specific student
    await addCompletedTopic({ topicId, studentId })

    // Check if all students in the class have completed the questions
    const classCompleted = await isClassCompleted(classId, topicId);

    // Update the isCompleted field of the topic if all students have completed
    if (classCompleted) {
      await completeTopic(topicId)
    }
  }

  return results
}

module.exports = {
  getResult,
  createResult
};
