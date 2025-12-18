import { Channels, Publisher, type TicketCreatedEvent } from "@abusalh-tickting/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Channels.TicketCreated = Channels.TicketCreated;
}