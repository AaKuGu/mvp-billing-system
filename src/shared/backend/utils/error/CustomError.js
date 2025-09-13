// utils/CustomError.js
class CustomError extends Error {
  constructor(message, statusCode = 500, context = "") {
    super(message);
    this.statusCode = statusCode;
    this.context = context;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
