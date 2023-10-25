const PrismaService = require("./prisma.service");

const prisma = PrismaService

async function getAllStudents() {
    return await prisma.student.findMany();
}

async function getStudentById(student_id) {
    return await prisma.student.findUnique({
        where: {
            student_id
        }
    });
}


module.exports = {
    getAllStudents,
    getStudentById,
}