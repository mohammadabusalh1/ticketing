import e = require("express");
import { CustomError } from "../errors/custom-error.js";

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
