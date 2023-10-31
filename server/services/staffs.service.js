const generateId = require("../util/generateId");
const { createPassword } = require("../util/password");
const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function getAllStaff() {
  return await prisma.staff.findMany({
    include: {
      level: true
    }
  });
}

async function getStaffById(staff_id) {
  return await prisma.staff.findUnique({
    where: {
      staff_id
    }
  });
}

async function createStaff({ staffDetails, password, levelName, subjectName }) {
  const staff_id = await generateId(await getAllStaff(), "staff");
  const encryptedPassword = await createPassword(password);

  return await prisma.staff.create({
    data: {
      staff_id,
      ...staffDetails,
      Auth: {
        create: {
          password: encryptedPassword
        }
      },
      level: {
        createMany: levelName
      },
      subjects: {
        createMany: subjectName
      }
    }
  });
}

async function updateStaff({ id, staffDetails }) {
  return await prisma.staff.update({
    where: {
      id
    },
    data: staffDetails
  });
}

async function deleteStaff(id) {
  return await prisma.staff.delete({
    where: {
      id
    }
  });
}

module.exports = {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  getStaffById
};
