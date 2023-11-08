const PrismaService = require("./prisma.service");

const prisma = PrismaService;

async function getResult() {
  await prisma.results.findMany({
    include: { student: true, category: true }
  });
}

async function createResult({ data }) {
  await prisma.results.create({
    data: {
      ...data
    }
  });
}

module.exports = {
  getResult,
  createResult
};
