const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function createCategories() {
    return await prisma.category.createMany({
        data: [{ name: 'Exam' }, { name: 'Quiz' }],
    });
}

async function getCategories() {
    return await prisma.category.findMany({});
}

module.exports = {
    getCategories,
    createCategories,
};
