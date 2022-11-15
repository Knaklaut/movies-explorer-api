const router = require('express').Router();

const { validationUser, validationAuth } = require('../middlewares/validityCheck');
const { createUser, login } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { notFoundProcessor } = require('../middlewares/errProcessor');

router.post('/signup', validationUser, createUser);
router.post('/signin', validationAuth, login);
router.use('/movies', movieRouter);
router.use('/users', userRouter);
router.use(auth);
router.use(notFoundProcessor);

module.exports = router;
