const { checkToken } = require('../utils/jwt');
const AuthError = require('../errors/AuthError');
const { Message } = require('../utils/constants');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    throw new AuthError(Message.AUTH_REQUIRED);
  }
  const token = auth.replace('Bearer ', '');
  let payload;
  try {
    payload = checkToken(token);
  } catch (err) {
    throw new AuthError(Message.AUTH_REQUIRED);
  }
  req.user = payload;
  next();
};
