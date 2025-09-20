import { type NextFunction, type Request, type Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error.ts";

/**
 * Validates the request by checking for any validation errors.
 * If there are errors, a RequestValidationError is thrown with the error details.
 * Otherwise, the next middleware in the stack is called.
 *
 * @param {Request} req The Express request object.
 * @param {Response} res The Express response object.
 * @param {NextFunction} next The next middleware function in the stack.
 */
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  next();
};
export { validateRequest };
