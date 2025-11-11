import express from "express";
import { Ticket } from "../models/ticket.ts";
import { NotAuthError, NotFoundError } from "@abusalh-tickting/common";

const router = express.Router();

router.put("/api/tickets/:id", async (req: any, res: any) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundError();
  }
  if (ticket.userId !== req.currentUser!.id) {
    throw new NotAuthError();
  }
  ticket.set({
    title: req.body.title,
    price: req.body.price,
  });
  await ticket.save();
  res.send(ticket);
});

export { router as updateTicketRouter };
