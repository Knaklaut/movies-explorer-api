const router = require('express').Router();

const { validationUser, validationAuth } = require('../middlewares/validityCheck');
const { createUser, login } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { Message } = require('../utils/constants');

router.post('/signup', validationUser, createUser);
router.post('/signin', validationAuth, login);
router.use(auth);
router.use('/movies', movieRouter);
router.use('/users', userRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(Message.PAGE_NOT_FOUND));
});

module.exports = router;
