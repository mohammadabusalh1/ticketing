import bodyParser from "body-parser";
import express from "express";
const { json } = bodyParser;
import { extractJwt, requireAuth } from "@abusalh-tickting/common";

import { errorHandler, NotFoundError } from "@abusalh-tickting/common";
import cookieSession from "cookie-session";

import { newTicketRouter } from "./routes/new.ts";
import { showTicketRouter } from "./routes/show.ts";
import { indexTicketRouter } from "./routes/index.ts";
import { updateTicketRouter } from "./routes/update.ts";

const app = express();
app.use(json());
app.set("trust proxy", true); // Trust proxy for secure cookies
app.use(
  cookieSession({
    signed: false, // We don't use a signature because the JWT itself is tamper-resistant
    secure: process.env.NODE_ENV !== "test", // We use HTTPS because the JWT is sensitive data
  })
);

app.use(extractJwt);
app.use(requireAuth);

app.use(newTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("/{*any}", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
