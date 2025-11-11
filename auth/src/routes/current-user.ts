import express from "express";
import { extractJwt, requireAuth } from "@abusalh-tickting/common";

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
