const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function getSubjects() {
  return await prisma.staffSubject.findMany({});
}

async function createSubjects() {
  const subject = await getSubjects();

  const subjectNames = [
    { name: "RME" },
    { name: "English" },
    { name: "BDT" },
    { name: "Integrated Science" }
  ];

  if (subject.length === 0)
    return await prisma.staffSubject.createMany({
      data: subjectNames
    });
}

module.exports = {
  getSubjects,
  createSubjects
};
