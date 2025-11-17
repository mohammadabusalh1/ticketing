import type { Message } from "node-nats-streaming";
import type { TicketCreatedEvent } from "../types/tikcet-created-type";
import Channels = require("./channels");
import Listener = require("./base-listener");

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Channels.TicketCreated = Channels.TicketCreated;
  queueGroupName = "orders-service-queue-grou";
  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log("Event data:", data);
    msg.ack();
  }
}

export = TicketCreatedListener;
