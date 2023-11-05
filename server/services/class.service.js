const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function getClass() {
  return await prisma.class.findMany({
    include: {
      staff: true,
      Student: true
    }
  });
}

async function createClass() {
  const level = await getClass();

  const classNames = [
    { name: "Creché" },
    { name: "KG 1" },
    { name: "KG 2" },
    { name: "Primary 1" },
    { name: "Primary 2" },
    { name: "Primary 3" },
    { name: "Primary 4" },
    { name: "Primary 5" },
    { name: "Primary 6" },
    { name: "JHS 1" },
    { name: "JHS 2" },
    { name: "JHS 3" }
  ];

  if (level.length === 0)
    return await prisma.class.createMany({
      data: classNames
    });
}

module.exports = {
  createClass,
  getClass
};
