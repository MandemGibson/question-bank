require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const createError = require("http-errors");

const apiRouter = require("./routes/api.routes");
const { createAdmin } = require("./services/admin.service");
const deserialiseUser = require("./middleware/deserialiseUser");
const errorHandler = require("./middleware/errorHandler");
const { createClass } = require("./services/class.service");
const { createSubjects } = require("./services/subjects.service");

const PORT = process.env.PORT || 3000;

const app = express();

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: function(origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);
app.use(deserialiseUser);

app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/api", apiRouter);

app.use((req, res, next) => {
  next(createError.NotFound());
});

console.log(`listening on port ${process.env.PORT}`);

app.use(errorHandler);

app.listen(PORT, "127.0.0.1", async () => {
  console.log(`@ http://localhost:${PORT}`);
  const admin = await createAdmin();
  const level = await createClass();
  const subject = await createSubjects();
  console.log(admin ? `Created admin ${admin.id}` : "Admin exists");
  console.log(level);
  console.log(subject);
});
