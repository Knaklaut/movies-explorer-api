const router = require('express').Router();

const { validationUserData } = require('../middlewares/validityCheck');
const { getUser, updateUserData } = require('../controllers/users');

router.get('/users/me', getUser);
router.patch('/users/me', validationUserData, updateUserData);

module.exports = router;
