const { ServerRes } = require('../utils/constants');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ServerRes.UNAUTHORIZED;
  }
}

module.exports = AuthError;
