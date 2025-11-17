import TicketCreatedPublisher = require("./events/ticket-created-publisher");
import type { TicketCreatedEvent } from "./types/tikcet-created-type";
const nats = require("node-nats-streaming");

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222", // NATS Streaming default port
});

// Wait until connected
stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const data: TicketCreatedEvent["data"] = {
    id: "123",
    title: "Concert",
    price: 20,
  };

  new TicketCreatedPublisher(stan).publish(data, () => {
    console.log("Event published successfully");
  });
});
