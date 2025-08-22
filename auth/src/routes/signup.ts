import express from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error.js";
import { DatabaseConnectionError } from "../errors/database-connection-error.js";

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
  (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    // Proceed with signup logic (e.g., save to DB)
    // res.send("Signup successful");

    throw new DatabaseConnectionError();
  }
);

export { router as signupRouter };
