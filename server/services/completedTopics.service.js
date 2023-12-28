const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function getCompletedTopics({ studentId, topicId }) {
    return await prisma.completedTopics.findFirst({
        where: {
            studentId,
            topicId
        },
    });
}

module.exports = {
    getCompletedTopics,
};
