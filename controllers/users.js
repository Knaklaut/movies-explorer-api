const bcrypt = require('bcrypt');

const { generateToken } = require('../utils/jwt');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictingError = require('../errors/ConflictingError');
const { ServerRes, Message } = require('../utils/constants');

const getUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => new NotFoundError(Message.USER_NOT_FOUND))
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
    .orFail(() => new NotFoundError(Message.USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(Message.BAD_REQUEST));
      } else if (err.code === 11000) {
        next(new ConflictingError(Message.CONFLICTING));
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
    .then((user) => res.status(ServerRes.CREATED).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(Message.BAD_REQUEST));
      } else if (err.code === 11000) {
        next(new ConflictingError(Message.CONFLICTING));
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
        throw new AuthError(Message.USER_NOT_FOUND);
      }
      return Promise.all([
        user,
        bcrypt.compare(password, user.password),
      ]);
    })
    .then(([user, isPasswordCorrect]) => {
      if (!isPasswordCorrect) {
        throw new AuthError(Message.UNAUTHORIZED);
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
