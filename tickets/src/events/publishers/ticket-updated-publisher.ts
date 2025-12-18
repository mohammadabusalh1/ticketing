import { Channels, Publisher, type TicketUpdatedEvent} from "@abusalh-tickting/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Channels.TicketUpdated = Channels.TicketUpdated;
}