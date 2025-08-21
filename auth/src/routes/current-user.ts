import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req: any, res: any) => {
  res.send("Hello World");
});

export { router as currentUserRouter };
