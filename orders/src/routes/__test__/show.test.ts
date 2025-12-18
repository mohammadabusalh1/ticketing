import request from "supertest";
import { app } from "../../app.ts";
import "../../test/setup.ts";
import mongoose from "mongoose";
import { it, expect } from "@jest/globals";

it("returns the ticket if it exists", async () => {
  const cookie = await global.signup("yl6r8@example.com");
  const title = "asdfasdf";
  const price = 10;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title, price })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});

it("returns a 404 if the ticket is not found", async () => {
  const cookie = await global.signup("yl6r8@example.com");

  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/tickets/${id}`)
    .set("Cookie", cookie)
    .send()
    .expect(404);
});
