require("dotenv").config();

const apiRouter = require("express").Router();

const jwt = require("jsonwebtoken");

const PrismaService = require('../services/prisma.service')
const staffRouter = require("./staffs.routes");
const questionRouter = require("./questions.routes");

const prisma = PrismaService;

apiRouter.use('/staffs', staffRouter)
apiRouter.use('/questions', questionRouter)


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
