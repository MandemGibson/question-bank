const generateId = require("../util/generateId");
const { createPassword } = require("../util/password");
const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function getAllStudents() {
  return await prisma.student.findMany({
    include: { level: true, Results: true }
  });
}

async function getStudentById({ id, student_id }) {
  return await prisma.student.findUnique({
    where: {
      id,
      student_id
    },
    include: { level: true, Results: true }
  });
}

async function createStudent({ studentDetails, password }) {
  const student_id = await generateId(await getAllStudents(), "student");
  const encryptedPassword = await createPassword(password);

  const { level } = studentDetails;

  const existingClass = await prisma.class.findFirst({
    where: {
      name: { in: level }
    }
  });

  return await prisma.student.create({
    data: {
      student_id,
      ...studentDetails,
      level: {
        connect: existingClass
      },
      auth: {
        create: {
          password: encryptedPassword
        }
      }
    }
  });
}

async function updateStudent({ id, studentDetails }) {
  return await prisma.student.update({
    where: {
      id
    },
    data: studentDetails
  });
}

async function countStudentsInClass(classId) {
  return await prisma.student.count({
    where: {
      classId
    }
  })
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  countStudentsInClass
};
