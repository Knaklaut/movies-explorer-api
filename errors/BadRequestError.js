const { ServerRes } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ServerRes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
