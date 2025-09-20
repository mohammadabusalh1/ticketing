import { type NextFunction, type Request, type Response } from "express";
import { NotAuthError } from "../errors/not-auth-error.ts";

/**
 * Checks if the request has a valid user session.
 * If the user session is invalid, a NotAuthError is thrown.
 * Otherwise, the next middleware function in the stack is called.
 * This middleware is used to protect routes that require authentication.
 *
 * @param {Request} req The Express request object.
 * @param {Response} res The Express response object.
 * @param {NextFunction} next The next middleware function in the stack.
 */
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthError();
  }
  next();
};

export { requireAuth };
