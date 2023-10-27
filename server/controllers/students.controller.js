const {
  getAllStudents,
  createStudent,
} = require("../services/students.service");

async function getAllStudentsHandler(req, res, next) {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (error) {
    next(error);
  }
}

async function createStudentHandler(req, res, next) {
  try {
    const studentDetails = req.body;
    studentDetails.dob = new Date(studentDetails.dob);

    const { password } = studentDetails;
    studentDetails.password = undefined;

    const students = await createStudent({ studentDetails, password });
    res.json(students);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllStudentsHandler,
  createStudentHandler,
};
