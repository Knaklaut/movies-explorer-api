const NotFoundError = require('../errors/NotFoundError');

const generalProcessor = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(err.statusCode).send({ message: 'Что-то пошло не так.' });
  }
  next();
};

const notFoundProcessor = (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена.'));
};

module.exports = {
  generalProcessor,
  notFoundProcessor,
};
