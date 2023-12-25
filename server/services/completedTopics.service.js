const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function getCompletedTopics(studentId) {
    return await prisma.completedTopics.findMany({
        where: {
            studentId
        },
    });
}

module.exports = {
    getCompletedTopics,
};
