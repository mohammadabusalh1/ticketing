import TicketCreatedListener = require("./events/ticket-created-listener");

const nats = require("node-nats-streaming");

// create special id
const id = Math.floor(Math.random() * 100000).toString();

const stan = nats.connect("ticketing", id, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close()); // عند Ctrl + C
process.on("SIGTERM", () => stan.close()); // عند إعادة التشغيل من أدوات التطوير
