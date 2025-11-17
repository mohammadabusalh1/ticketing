import Channels = require("../events/channels");

export interface TicketCreatedEvent {
  Channel: Channels.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
