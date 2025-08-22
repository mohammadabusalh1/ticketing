import { CustomError } from "./custom-error.js";

export class DatabaseConnectionError extends CustomError {
  reason = "Database connection error";
  statusCode = 500;

  constructor(message?: string) {
    super();
    if (message) {
      this.reason = message;
    }
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
