import bodyParser from "body-parser";
import express from "express";
const { json } = bodyParser;
import { extractJwt, requireAuth } from "@abusalh-tickting/common";

import { errorHandler, NotFoundError } from "@abusalh-tickting/common";
import cookieSession from "cookie-session";

import { newOrderRouter } from "./routes/new.ts";
import { showOrderRouter } from "./routes/show.ts";
import { indexOrderRouter } from "./routes/index.ts";
import { deleteOrderRouter } from "./routes/delete.ts";

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

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all("/{*any}", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
