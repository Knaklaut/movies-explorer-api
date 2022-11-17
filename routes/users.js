const router = require('express').Router();

const { validationUserData } = require('../middlewares/validityCheck');
const { getUser, updateUserData } = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', validationUserData, updateUserData);

module.exports = router;
