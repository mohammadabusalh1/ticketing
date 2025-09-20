import { CustomError } from "./custom-error.ts";

export class NotAuthError extends CustomError {
  statusCode = 401;
  reason = "Not authorized";
  constructor() {
    super();
    Object.setPrototypeOf(this, NotAuthError.prototype);
  }
  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
