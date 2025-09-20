import mongoose from "mongoose";
import { app } from "./app.ts";

// Connect to MongoDB
const start = async () => {
  // if (!process.env.MONGO_URI) {
  //   throw new DatabaseConnectionError("MONGO_URI must be defined");
  // }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-db-srv:27017/auth");
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (err: any) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};

start();
