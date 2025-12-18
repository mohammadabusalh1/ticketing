import { OrderStatus } from "@abusalh-tickting/common";
import { Model } from "mongoose";
import mongoose from "mongoose";
import { Document } from "mongoose";
import type { TicketDoc } from "./ticket.ts";

interface OrderAttrs {
  userId: string;
  status: OrderStatus; // لاحقًا سنغيره إلى نوع Enum
  expiresAt: Date;
  ticket: TicketDoc; // مرجع لتذكرة موجودة
}

interface OrderDoc extends Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

interface OrderModel extends Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus), // 🔐 حماية قوية
      default: OrderStatus.Created,     // (اختياري)
    },
    expiresAt: { type: mongoose.Schema.Types.Date }, // يمكن أن تكون غير مطلوبة
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket", // ربط بالـ Ticket
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id; // تغيير _id إلى id
        delete ret._id;
      },
    },
  }
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
