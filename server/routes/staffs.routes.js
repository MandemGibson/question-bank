const { getStaffHandler, createStaffHandler, updateStaffHandler, deleteStaffHandler } = require("../controllers/staffs.controller");

const staffRouter = require("express").Router();

staffRouter.get("/", getStaffHandler);

staffRouter.post("/", createStaffHandler);

staffRouter.patch("/:id", updateStaffHandler);

staffRouter.delete("/:id", deleteStaffHandler);

module.exports = staffRouter