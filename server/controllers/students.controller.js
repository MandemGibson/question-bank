const { getAllStudents } = require("../services/students.service");

async function getAllStudentsHandler(req, res, next) {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllStudentsHandler,
};
