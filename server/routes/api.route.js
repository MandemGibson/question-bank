const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/questions", async (req, res, next) => {
  try {
    const questions = await prisma.question.findMany({
      include: { category: true, answerChoices: true },
    });
    res.json(questions);
  } catch (error) {
    next(error);
  }
});

router.get("/questions/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const question = await prisma.question.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(question);
  } catch (error) {
    next(error);
  }
});

router.post("/questions", async (req, res, next) => {
  try {
    const data = req.body;
    const question = await prisma.question.create({
      data: data,
    });
    res.json(question);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
