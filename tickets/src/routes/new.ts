import express from "express";
import { body } from "express-validator";
import { validateRequest } from "@abusalh-tickting/common";
import { Ticket } from "../models/ticket.ts";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher.ts";
import { NatsWrapper } from "../nats-wrapper.ts";

const router = express.Router();

router.post(
  "/api/tickets",
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ max: 100 })
      .withMessage("Title must be 100 characters or less"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: any, res: any) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();

    const client = NatsWrapper.getClient();

    await new TicketCreatedPublisher(client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    }, () => { });

    return res.status(201).send(ticket);
  }
);

export { router as newTicketRouter };
