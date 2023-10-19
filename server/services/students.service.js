const PrismaService = require("./prisma.service");

const prisma = PrismaService

async function getAllStudents() {
    return await prisma.student.findMany();
}


module.exports = {
    getAllStudents
}