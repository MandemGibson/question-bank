const generateId = require("../util/generateId");
const { createPassword } = require("../util/password");
const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function getAllStudents() {
  return await prisma.student.findMany();
}

async function getStudentById(student_id) {
  return await prisma.student.findUnique({
    where: {
      student_id,
    },
  });
}

async function createStudent({ studentDetails, password }) {
  const student_id = await generateId(await getAllStudents(), "student");
  const encryptedPassword = await createPassword(password);
  return await prisma.student.create({
    data: {
      student_id,
      ...studentDetails,
      auth: {
        create: {
          password: encryptedPassword,
        },
      },
    },
  });
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
};
