import e = require("express");
import { RequestValidationError } from "../errors/request-validation-error.js";
import { DatabaseConnectionError } from "../errors/database-connection-error.js";

export const errorHandler = (
  err: Error,
  req: e.Request,
  res: e.Response,
  next: e.NextFunction
) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: "Invalid request parameters",
      errors: err.serializeErrors(),
    });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.reason,
      errors: err.serializeErrors(),
    });
  }

  res.status(500).json({
    status: "error",
    message: err.message,
    errors: err,
  });
};
