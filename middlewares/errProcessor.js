const { Message } = require('../utils/constants');

const generalProcessor = (err, req, res, next) => {
  const { errCode = 500, message } = err;
  res.status(errCode)
    .send({ message: errCode === 500 ? Message.SERVER_ERR : message });
  next();
};

const badReqProcessor = (err, req, res, next) => {
  const { errCode = 400, message } = err;
  res.status(errCode)
    .send({ message: errCode === 400 ? Message.BAD_REQUEST : message });
  next();
};

const notFoundProcessor = (err, req, res, next) => {
  const { errCode = 404, message } = err;
  res.status(errCode)
    .send({ message: errCode === 404 ? Message.PAGE_NOT_FOUND : message });
  next();
};

module.exports = {
  generalProcessor,
  badReqProcessor,
  notFoundProcessor,
};
