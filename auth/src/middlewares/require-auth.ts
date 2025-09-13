import { type NextFunction, type Request, type Response } from "express";
import { NotAuthError } from "../errors/not-auth-error.js";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthError();
  }
  next();
};

export { requireAuth };
