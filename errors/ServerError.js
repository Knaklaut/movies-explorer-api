const { SERVER_ERR } = require('../utils/constants');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = SERVER_ERR;
  }
}

module.exports = ServerError;
