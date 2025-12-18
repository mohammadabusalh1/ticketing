import mongoose from "mongoose";
import { app } from "./app.ts";
import { DatabaseConnectionError } from "@abusalh-tickting/common";
import { NatsWrapper } from "./nats-wrapper.ts";

// Connect to MongoDB
const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new DatabaseConnectionError("MONGO_URI must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  try{
    await NatsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
    NatsWrapper.getClient().on("close", () => {
      console.log("NATS connection closed!");
      process.exit(); // shutdown the pod of tickets service to make restart
    });

    process.on("SIGINT", () => NatsWrapper.getClient().close()); // عند Ctrl + C
    process.on("SIGTERM", () => NatsWrapper.getClient().close()); // عند إعادة التشغيل من أدوات التطوير
  }catch(err){
    console.error("Error connecting to NATS:", err);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (err: any) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};

start();
