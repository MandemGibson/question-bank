const apiRouter = require('express').Router();

apiRouter.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

module.exports = apiRouter;
