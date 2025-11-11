import express, { type Request, type Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@abusalh-tickting/common";
import { User } from "../models/user.ts";
import { PasswordService } from "../services/password.ts";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    // Compare the provided password with the stored password
    const passwordsMatch = await PasswordService.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    // Generate JWT
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET || "default_jwt_key"
    );

    // Store it on session object for all domain: tickets.dev
    // So any request from tickets.dev has this cookie automatically
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(existingUser);
  }
);

export { router as signinRouter };
