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

  const data = {
    id: "123",
    title: "Concert",
    price: 20,
  };

  const jsonData = JSON.stringify(data);

  // Publish an event to the "ticket:created" channel
  stan.publish("ticket:created", jsonData, () => {
    console.log("Event published");
  });
});
