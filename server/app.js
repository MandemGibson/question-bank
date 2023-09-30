require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const createError = require("http-errors");

const apiRouter = require("./routes/api.route")

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works perfect🐻" });
});

app.use("/api", apiRouter);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status().json({
    status: status,
    message: err.message,
  });
});


app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
