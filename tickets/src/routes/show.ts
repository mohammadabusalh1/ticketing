import express from "express";
import mongoose from "mongoose";
import { Ticket } from "../models/ticket.ts";
import { NotFoundError } from "@abusalh-tickting/common";

const router = express.Router();

router.get("/api/tickets/:id", async (req: any, res: any) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new NotFoundError();
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as showTicketRouter };
