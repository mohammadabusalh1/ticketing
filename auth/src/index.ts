import bodyParser from "body-parser";
import express from "express";
const { json } = bodyParser;

import { currentUserRouter } from "./routes/current-user.js";
import { signinRouter } from "./routes/signin.js";
import { signoutRouter } from "./routes/signout.js";
import { signupRouter } from "./routes/signup.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app = express();
app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
