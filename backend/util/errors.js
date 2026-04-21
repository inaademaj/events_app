class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.message = message;
    this.status = 404;
  }
}

class NotAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotAuthError';
    this.message = message;
    this.status = 401;
  }
}

exports.NotFoundError = NotFoundError;
exports.NotAuthError = NotAuthError;
