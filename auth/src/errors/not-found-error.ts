import { CustomError } from "./custom-error.js";

export class NotFoundError extends CustomError {
  statusCode = 404;
  reason = "Resource not found";

  constructor() {
    super();
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
