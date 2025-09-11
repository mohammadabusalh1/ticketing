import bodyParser from "body-parser";
import express from "express";
const { json } = bodyParser;
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user.js";
import { signinRouter } from "./routes/signin.js";
import { signoutRouter } from "./routes/signout.js";
import { signupRouter } from "./routes/signup.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { NotFoundError } from "./errors/not-found-error.js";
import cookieSession from "cookie-session";
import { validateRequest } from "./middlewares/validate-request.js";

const app = express();
app.use(json());
app.set("trust proxy", true); // Trust proxy for secure cookies
app.use(
  cookieSession({
    signed: false, // We don't use a signature because the JWT itself is tamper-resistant
    secure: true, // We use HTTPS because the JWT is sensitive data
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("/{*any}", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

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
