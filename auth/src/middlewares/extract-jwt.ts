import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

// Augment the Express Request interface to include currentUser (line 37) only for type script
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

/**
 * Extracts the JWT from the request session and adds the
 * corresponding user details to the request object.
 *
 * If the request session has a JWT, the request object is
 * augmented with the `currentUser` property, which contains
 * the user's ID and email.
 *
 * @param {Request} req The Express request object.
 * @param {Response} res The Express response object.
 * @param {NextFunction} next The next middleware function in the stack.
 */
const extractJwt = (req: Request, res: Response, next: NextFunction) => {
  if (req.session?.jwt) {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_SECRET || "default_jwt_key"
    ) as UserPayload;

    req.currentUser = payload;
  }
  next();
};

export { extractJwt };
