import { Channels } from "./events/channels.js";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher.js";
import type { TicketCreatedEvent } from "./types/tikcet-created-type.js";

const nats = require("node-nats-streaming");

// Create a client (called "stan" in NATS terminology)
// ticketing is the cluster ID, abc is the client ID
// The cluster ID is a unique identifier for a group of NATS clients that can communicate with each other. It helps establish a connection between clients that belong to the same cluster.
// each connection to NATS Streaming Server must have a unique client ID (publisher or subscriber each need a unique ID)
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
