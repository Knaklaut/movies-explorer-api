const { ServerRes } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ServerRes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
