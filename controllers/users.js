const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictingError = require('../errors/ConflictingError');
const { ServerRes, Message } = require('../utils/constants');

const { MODE_ENV, JWT_SECRET, SALT_ROUNDS } = process.env;

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(ServerRes.OK).send(user))
    .catch(next);
};

const updateUserData = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(Message.USER_NOT_FOUND))
    .then((user) => res.status(ServerRes.OK).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictingError(Message.CONFLICTING));
        return;
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(Message.BAD_REQUEST));
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, Number(SALT_ROUNDS))
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(ServerRes.CREATED).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(Message.BAD_REQUEST));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictingError(Message.CONFLICTING));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, MODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser,
  updateUserData,
  createUser,
  login,
};
