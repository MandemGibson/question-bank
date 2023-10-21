const PrismaService = require("./prisma.service");

const prisma = PrismaService

async function getAllStudents() {
    return await prisma.student.findMany();
}

async function getStudentById(id) {
    return await prisma.student.findUnique({
        where: {
            id
        }
    });
}


module.exports = {
    getAllStudents,
    getStudentById,
}