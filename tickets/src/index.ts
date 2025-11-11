import mongoose from "mongoose";
import { app } from "./app.ts";
import { DatabaseConnectionError } from "@abusalh-tickting/common";

// Connect to MongoDB
const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new DatabaseConnectionError("MONGO_URI must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
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
