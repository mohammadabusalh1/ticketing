import express from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error.js";
import { User } from "../models/user.js";

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
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email already exists" }] });
    }

    const user = User.build({ email, password });
    user.save();

    res.status(201).send(user);
  }
);

export { router as signupRouter };
