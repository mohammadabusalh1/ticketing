import e = require("express");
import { CustomError } from "../errors/custom-error.ts";

/**
 * Handles errors that occur during request processing and sends appropriate HTTP responses.
 * This middleware checks for custom errors and formats the response, or returns a generic error for unexpected issues.
 *
 * Args:
 *   err (Error): The error object thrown during request processing.
 *   req (e.Request): The Express request object.
 *   res (e.Response): The Express response object.
 *   next (e.NextFunction): The next middleware function in the stack.
 *
 * Returns:
 *   Sends a JSON response with error details and appropriate HTTP status code.
 */
export const errorHandler = (
  err: Error,
  req: e.Request,
  res: e.Response,
  next: e.NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  res.status(500).json({
    status: "error",
    message: err.message,
    errors: err,
  });
};
