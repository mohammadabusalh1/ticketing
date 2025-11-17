import type { TicketCreatedEvent } from "../types/tikcet-created-type";
import Publisher = require("./base-publisher");
import Channels = require("./channels");

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Channels.TicketCreated = Channels.TicketCreated;
}

export = TicketCreatedPublisher;
