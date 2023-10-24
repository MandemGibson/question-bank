const PrismaService = require("./prisma.service");

const prisma = PrismaService

async function getAllStudents() {
    return await prisma.student.findMany();
}

async function getStudentById(studentId) {
    return await prisma.student.findUnique({
        where: {
            studentId
        }
    });
}


module.exports = {
    getAllStudents,
    getStudentById,
}