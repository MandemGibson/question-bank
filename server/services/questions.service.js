const PrismaService = require("./prisma.service");

const prisma = PrismaService

async function getQuestions() {
    return await prisma.topic.findMany({
        include: {
            questions: {
                include: { answerChoices: true },
            },
            category: true,
        },
    });
}

async function getQuestionById(id) {
    return await prisma.topic.findUnique({
        where: {
            id,
        },
    });
}

async function createQuestions({ topicData, questionTexts, answerChoices }) {
    return await prisma.topic.create({
        data: {
            ...topicData,
            questions: {
                createMany: {
                    data: questionTexts
                }
            },
            answerChoices: {
                createMany: {
                    data: answerChoices
                }
            }
        },
        include: {
            questions,
            answerChoices
        }
    })
}

async function deleteQuestionById(id) {
    return await prisma.topic.delete({
        where: {
            id
        },
    });
}

async function updateQuestionById({ id, topicData, questionTexts, answerChoices }) {
    return await prisma.topic.update({
        where: {
            id,
        },
        data: {
            ...topicData,
            questions: {
                updateMany: {
                    data: questionTexts
                }
            },
            answerChoices: {
                updateMany: {
                    data: answerChoices
                }
            }
        },
    })
}

module.exports = {
    getQuestions,
    getQuestionById,
    createQuestions,
    deleteQuestionById,
    updateQuestionById,
}