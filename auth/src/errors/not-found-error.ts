import { CustomError } from "./custom-error.js";

/**
 * Represents an error that occurs when a requested resource cannot be found.
 * This error is used to indicate that the client has requested a non-existent endpoint or resource.
 */
export class NotFoundError extends CustomError {
  statusCode = 404;
  reason = "Resource not found";

  /**
   * Creates a new NotFoundError.
   * Sets up the prototype chain for proper error handling.
   */
  constructor() {
    super();
    Object.setPrototypeOf(this, NotFoundError.prototype);
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
