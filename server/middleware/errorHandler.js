const {
  PrismaClientKnownRequestError,
} = require("@prisma/client/runtime/library");

function errorHandler(err, req, res, next) {
  // if (err instanceof PrismaClientKnownRequestError) {
  //   const targets = err.meta?.target;
  //   const target = targets[0];
  //   const message = `${target} already exists`;
  //   return res.status(409).json({
  //     message,
  //   });
  // }

  const status = err.status || 500;
  res.status(status).json({
    status: status,
    message: err.message,
  });
}

module.exports = errorHandler;
