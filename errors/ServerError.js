const { ServerRes } = require('../utils/constants');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ServerRes.SERVER_ERR;
  }
}

module.exports = ServerError;
