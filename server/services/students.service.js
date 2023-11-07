const generateId = require("../util/generateId");
const { createPassword } = require("../util/password");
const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function getAllStudents() {
  return await prisma.student.findMany({
    include: { level: true }
  });
}

async function getStudentById(student_id) {
  return await prisma.student.findUnique({
    where: {
      student_id
    },
    include: { level: true }
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

  // const classData = existingClass
  //   ? existingClass.map(classRecords => {
  //       return { id: classRecords.id, name: classRecords.name || undefined };
  //     })
  //   : [];

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

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent
};
