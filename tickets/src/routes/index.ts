import express from "express";
import { Ticket } from "../models/ticket.ts";

const router = express.Router();

router.get("/api/tickets", async (req: any, res: any) => {
  const tickets = await Ticket.find({});
  res.send(tickets);
});

export { router as indexTicketRouter };
