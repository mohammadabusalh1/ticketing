import express from "express";
import { body } from "express-validator";
import { User } from "../models/user.js";
import { BadRequestError } from "../errors/bad-request-error.js";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request.js";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    // Validate and sanitize email
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),

    // Validate and sanitize password
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character"),
  ],
  validateRequest,
  async (req: any, res: any) => {
    const { email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "default_jwt_key"
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
