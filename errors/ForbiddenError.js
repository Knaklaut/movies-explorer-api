const { ServerRes } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ServerRes.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
