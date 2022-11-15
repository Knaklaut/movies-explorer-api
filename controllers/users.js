const bcrypt = require('bcrypt');

const { generateToken } = require('../utils/jwt');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictingError = require('../errors/ConflictingError');
const { CREATED } = require('../utils/constants');

const getUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => new NotFoundError('Такого пользователя не существует.'))
    .then((user) => res.send(user))
    .catch(next);
};

const updateUserData = (req, res, next) => {
  const id = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => new NotFoundError('Такого пользователя не существует.'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Передан некорректный идентификатор пользователя.'));
      } else if (err.code === 11000) {
        next(new ConflictingError('Пользователь с таким email уже существует.'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(CREATED).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } else if (err.code === 11000) {
        next(new ConflictingError('Пользователь с таким email уже существует.'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Пользователь не существует.');
      }
      return Promise.all([
        user,
        bcrypt.compare(password, user.password),
      ]);
    })
    .then(([user, isPasswordCorrect]) => {
      if (!isPasswordCorrect) {
        throw new AuthError('Неправильный email или пароль.');
      }
      return generateToken({ _id: user._id }, '7d');
    })
    .then((token) => {
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
