require("dotenv").config();

const apiRouter = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

apiRouter.get("/questions", async (req, res, next) => {
  try {
    const questions = await prisma.question.findMany({
      include: {
        questions: {
          include: { answerChoices: true },
        },
        category: true,
      },
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
    const { questionTexts, answerChoices, ...questionData } = data;

    const createdQuestionTexts = await prisma.questionText.createMany({
      data: questionTexts,
    });

    const createdAnswerChoices = await prisma.answerChoice.createMany({
      data: answerChoices,
    });

    const question = await prisma.question.create({
      data: {
        ...questionData,
        questions: {
          connect: createdQuestionTexts.map((text) => ({ id: text.id })),
        },
        answerChoices: {
          connect: createdAnswerChoices.map((choice) => ({ id: choice.id })),
        },
      },
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

apiRouter.get("/staffs", async (req, res, next) => {
  try {
    const staff = await prisma.staff.findMany({
      include: { class: true },
    });
    res.json(staff);
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/staffs", async (req, res, next) => {
  try {
    const data = req.body;
    if (data.profile_pic && data.profile_pic.data) {
      data.profile_pic = Buffer.from(data.profile_pic.data, "base64");
    }
    const staff = await prisma.staff.create({
      data: data,
    });
    res.json(staff);
  } catch (error) {
    next(error);
  }
});

apiRouter.patch("/staffs/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.profile_pic && data.profile_pic.data) {
      data.profile_pic = Buffer.from(data.profile_pic.data, "base64");
    }
    const staff = await prisma.staff.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
    res.json(staff);
  } catch (error) {
    next(error);
  }
});

apiRouter.delete("/staffs/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const staff = await prisma.staff.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(staff);
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/login", async (req, res, next) => {
  try {
    const username = req.body.name;
    const user = { name: username };

    const accesToken = jwt.sign(user, process.env.ACCESS_TOKEN);
    res.json({ accesToken: accesToken });
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/students", async (req, res, next) => {
  try {
    const students = await prisma.student.findMany({});
    res.json(students);
  } catch (error) {
    next(error);
  }
});

function authenticateToken(req, res, next) {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (token === null) return res.status(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
    if (error) return res.status(403);
    req.user = user;
    next();
  });
}

module.exports = apiRouter;
