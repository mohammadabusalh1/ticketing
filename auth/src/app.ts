import bodyParser from "body-parser";
import express from "express";
const { json } = bodyParser;

import { currentUserRouter } from "./routes/current-user.ts";
import { signinRouter } from "./routes/signin.ts";
import { signoutRouter } from "./routes/signout.ts";
import { signupRouter } from "./routes/signup.ts";
import { errorHandler } from "./middlewares/error-handler.ts";
import { NotFoundError } from "./errors/not-found-error.ts";
import cookieSession from "cookie-session";

const app = express();
app.use(json());
app.set("trust proxy", true); // Trust proxy for secure cookies
app.use(
  cookieSession({
    signed: false, // We don't use a signature because the JWT itself is tamper-resistant
    secure: process.env.NODE_ENV !== "test", // We use HTTPS because the JWT is sensitive data
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

export { app };
