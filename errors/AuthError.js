const { UNAUTHORIZED } = require('../utils/errCodes');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = AuthError;
