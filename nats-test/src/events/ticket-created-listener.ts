import type { Message } from "node-nats-streaming";
import { Listener } from "./base-listener.js";
import { Channels } from "./channels.js";
import type { TicketCreatedEvent } from "../types/tikcet-created-type.js";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Channels.TicketCreated = Channels.TicketCreated;
  queueGroupName = "orders-service-queue-grou";
  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log("Event data:", data);
    msg.ack();
  }
}
