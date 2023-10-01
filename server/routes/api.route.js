const apiRouter = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

apiRouter.get("/questions", async (req, res, next) => {
  try {
    const questions = await prisma.question.findMany({
      include: { category: true, answerChoices: true, staff: true },
    });
    res.json(questions);
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/questions/:id", async (req, res, next) => {
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

apiRouter.post("/questions", async (req, res, next) => {
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

apiRouter.delete("/questions/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await prisma.question.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(question);
  } catch (error) {
    next(error);
  }
});

apiRouter.patch("/questions/:id", async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const question = await prisma.question.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
    res.json(question);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
