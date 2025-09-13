import express from "express";
import { extractJwt } from "../middlewares/extract-jwt.js";
import { requireAuth } from "../middlewares/require-auth.js";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  extractJwt,
  requireAuth,
  async (req: any, res: any) => {
    return res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
