import { CustomError } from "./custom-error.js";

/**
 * Represents an error that occurs when a database connection fails.
 * This error is used to indicate issues specifically related to database connectivity.
 *
 * Args:
 *   message (string, optional): A custom error message describing the connection issue.
 *
 * Returns:
 *   An instance of DatabaseConnectionError with a status code and reason.
 */
export class DatabaseConnectionError extends CustomError {
  reason = "Database connection error";
  statusCode = 500;

  /**
   * Creates a new DatabaseConnectionError.
   * If a custom message is provided, it will be used as the error reason.
   *
   * Args:
   *   message (string, optional): A custom error message.
   */
  constructor(message?: string) {
    super();
    if (message) {
      this.reason = message;
    }
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  /**
   * Serializes the error into a standardized format for API responses.
   *
   * Returns:
   *   An array containing an object with the error message.
   */
  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
