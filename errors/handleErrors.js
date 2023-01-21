const { Message } = require('../utils/constants');

const handleErrors = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? Message.SERVER_ERR : message });
  next();
};

module.exports = handleErrors;
