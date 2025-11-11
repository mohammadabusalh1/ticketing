import type { Message } from "node-nats-streaming";
const nats = require("node-nats-streaming");

// create special id
const id = Math.floor(Math.random() * 100000);

const stan = nats.connect("ticketing", id, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("orders-service"); // 👈 Important line

  const subscription = stan.subscribe(
    "ticket:created",
    "orders-service-queue-group", // make a team
    options
  );

  subscription.on("message", (msg: Message) => {
    console.log("Received message:", msg.getSequence(), msg.getData());

    try {
      // simulate some processing
      // e.g., save to DB
      console.log("Processing event...");
      msg.ack(); // ✅ tell NATS the message is handled
    } catch (err) {
      console.error("Failed to process event:", err);
      // ❌ don’t ack — NATS will resend later
    }
  });
});

process.on("SIGINT", () => stan.close()); // عند Ctrl + C
process.on("SIGTERM", () => stan.close()); // عند إعادة التشغيل من أدوات التطوير
