const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function getResult() {
  return await prisma.results.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      student: {
        include: { level: true }
      },
      category: true
    }
  });
}

async function createResult({ data }) {
  return await prisma.results.create({
    data: data
  });
}

module.exports = {
  getResult,
  createResult
};
