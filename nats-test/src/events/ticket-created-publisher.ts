import { Channels } from "./channels.js";
import type { TicketCreatedEvent } from "../types/tikcet-created-type.js";
import { Publisher } from "./base-publisher.js";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Channels.TicketCreated = Channels.TicketCreated;
}
