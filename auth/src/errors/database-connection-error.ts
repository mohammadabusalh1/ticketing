import { CustomError } from "./custom-error.js";

export class DatabaseConnectionError extends CustomError {
  reason = "Database connection error";
  statusCode = 500;

  constructor(public errors: any[] = []) {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: this.reason }; // Correct property name
    });
  }
}
