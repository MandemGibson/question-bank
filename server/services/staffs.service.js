const generateId = require("../util/generateId");
const { createPassword } = require("../util/password");
const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function getAllStaff() {
  return await prisma.staff.findMany({
    include: {
      level: true,
      subjects: true,
      topics: true
    }
  });
}

async function getStaffById({ id, staff_id }) {
  return await prisma.staff.findUnique({
    where: {
      id,
      staff_id
    },
    include: { level: true }
  });
}

async function createStaff({ staffDetails, password }) {
  const staff_id = await generateId(await getAllStaff(), "staff");
  const encryptedPassword = await createPassword(password);

  const { level } = staffDetails;

  const { subjects } = staffDetails;

  const existingClass = await prisma.class.findMany({
    where: {
      name: { in: level }
    }
  });

  const existingSubjects = await prisma.staffSubject.findMany({
    where: {
      name: {
        in: subjects
      }
    }
  });

  const classData = existingClass
    ? existingClass.map(classRecords => {
        return { id: classRecords.id, name: classRecords.name || undefined };
      })
    : [];

  const subjectData = existingSubjects
    ? existingSubjects.map(subjectRecords => {
        return {
          id: subjectRecords.id,
          name: subjectRecords.name || undefined
        };
      })
    : [];

  return await prisma.staff.create({
    data: {
      staff_id,
      ...staffDetails,
      level: {
        connect: classData
      },
      subjects: {
        connect: subjectData
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
