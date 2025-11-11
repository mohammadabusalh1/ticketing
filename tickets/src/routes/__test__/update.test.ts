import request from "supertest";
import { app } from "../../app.ts";
import "../../test/setup.ts";
import mongoose from "mongoose";

it("returns a 404 if the ticket is not found", async () => {
  const cookie = await global.signup("yl6r8@example.com");
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", cookie)
    .send({
      title: "asdfasdf",
      price: 10,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "asdfasdf",
      price: 10,
    })
    .expect(401);
});

it("returns a 200 if the user has the ticket", async () => {
  const cookie = await global.signup("yl6r8@example.com");
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "asdfasdf",
      price: 10,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "asdfasdf",
      price: 10,
    })
    .expect(200);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const cookie = await global.signup("yl6r8@example.com");
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "asdfasdf",
      price: 10,
    })
    .expect(201);

  const otherUserCookie = await global.signup("yl6r8@example.com");

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", otherUserCookie)
    .send({
      title: "asdfasdf",
      price: 10,
    })
    .expect(401);
});
