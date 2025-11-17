import type { Channels } from "../events/channels.js";

export interface TicketCreatedEvent {
  Channel: Channels.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
