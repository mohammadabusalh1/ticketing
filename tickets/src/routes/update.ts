import express from "express";
import { Ticket } from "../models/ticket.ts";
import { NotAuthError, NotFoundError } from "@abusalh-tickting/common";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher.ts";
import { NatsWrapper } from "../nats-wrapper.ts";

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
  await new TicketUpdatedPublisher(NatsWrapper.getClient()).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
  }, () => { });
  res.send(ticket);
});

export { router as updateTicketRouter };
