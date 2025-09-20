import express from "express";
import { extractJwt } from "../middlewares/extract-jwt.ts";
import { requireAuth } from "../middlewares/require-auth.ts";

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
