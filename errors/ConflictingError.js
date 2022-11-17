const { ServerRes } = require('../utils/constants');

class ConflictingError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ServerRes.CONFLICTING_REQ;
  }
}

module.exports = ConflictingError;
