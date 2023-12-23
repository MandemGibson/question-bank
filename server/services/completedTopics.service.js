const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function getCompletedTopics(userId) {
    return await prisma.completedTopics.findMany({
        where: {
            userId
        },
    });
}

module.exports = {
    getCompletedTopics,
};
