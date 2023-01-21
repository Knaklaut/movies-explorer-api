const { Joi, celebrate } = require('celebrate');
const isURL = require('validator/lib/isURL');
const BadRequestError = require('../errors/BadRequestError');
const { Message } = require('../utils/constants');

const UrlValidator = (url) => {
  const validity = isURL(url);
  if (!validity) {
    throw new BadRequestError(Message.VALIDATION_BAD_URL);
  }
  return url;
};

const validationAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

const validationUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

const validationUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const validationMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(UrlValidator).required(),
    trailerLink: Joi.string().custom(UrlValidator).required(),
    thumbnail: Joi.string().custom(UrlValidator).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  validationAuth,
  validationId,
  validationUser,
  validationUserData,
  validationMovie,
};
