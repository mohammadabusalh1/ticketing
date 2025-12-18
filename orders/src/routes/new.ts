import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@abusalh-tickting/common";
import express, { type Request, type Response } from "express";
import mongoose from "mongoose";
const router = express.Router();
import { Ticket } from "../models/ticket.ts";
import { Order } from "../models/orders.ts";

import { body } from "express-validator";

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

// POST /api/orders -> create new order
router.post(
  "/api/orders",
  requireAuth, // تأكيد المصادقة
  [
    body("ticketId")
      .not()
      .isEmpty()
      .withMessage("Ticket ID must be provided")
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input)), // تحقق من صحة MongoID
  ],
  validateRequest, // إذا فشل validation، ترجع رسالة خطأ
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    // Find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    // Make sure that the ticket is not already reserved
    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError("Ticket is already reserved");
    }

    // make sure the deadline is less than 15 minutes from now
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // Build the order and save it to the database
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });

    await order.save();

    // Publish an event that the order was created

    // هنا يمكن إضافة المنطق لإنشاء الطلب
    res.status(201).send({ message: "Order created successfully", ticketId });
  }
);

export { router as newOrderRouter };
