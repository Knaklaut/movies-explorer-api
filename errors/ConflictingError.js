const { CONFLICTING_REQ } = require('../utils/errCodes');

class ConflictingError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICTING_REQ;
  }
}

module.exports = ConflictingError;
