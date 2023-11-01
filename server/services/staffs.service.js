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

async function createStaff({ staffDetails, password, subjectName }) {
  const staff_id = await generateId(await getAllStaff(), "staff");
  const encryptedPassword = await createPassword(password);

  const { level } = staffDetails;

  const existingClass = await prisma.class.findMany({
    where: {
      name: { in: level }
    }
  });

  // const classData = existingClass.map(classRecords => ({
  //   id: classRecords.id
  // }));
  const classData = existingClass
    ? existingClass.map(classRecords => {
        return { id: classRecords.id, name: classRecords.name || undefined };
      })
    : [];

  return await prisma.staff.create({
    data: {
      staff_id,
      ...staffDetails,
      level: {
        connect: classData
      },
      Auth: {
        create: {
          password: encryptedPassword
        }
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
