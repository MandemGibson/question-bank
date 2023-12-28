const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function countCompletedTopics({ topicId, classId }) {
    return await prisma.completedTopics.count({
        where: {
            topicId,
            student: {
                classId
            }
        }
    })
}

async function getCompletedTopics({ studentId, topicId }) {
    return await prisma.completedTopics.findFirst({
        where: {
            studentId,
            topicId
        },
    })
}

async function addCompletedTopic(data) {
    await prisma.completedTopics.create({
        data
    })
}

module.exports = {
    addCompletedTopic,
    getCompletedTopics,
    countCompletedTopics,
};
