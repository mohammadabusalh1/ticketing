import request from "supertest";
import { app } from "../../app.ts";
import "../../test/setup.ts";

it("returns a 201 on successful ticket creation", async () => {
  const cookie = await global.signup("yl6r8@example.com");
  const title = "asdfasdf";
  const price = 10;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title, price })
    .expect(201);

  expect(response.body.title).toEqual(title);
  expect(response.body.price).toEqual(price);
});

it("returns an error if the title is not provided", async () => {
  const cookie = await global.signup("yl6r8@example.com");
  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
});

it("returns an error if the price is not provided", async () => {
  const cookie = await global.signup("yl6r8@example.com");
  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "asdfasdf",
      price: undefined,
    })
    .expect(400);
});

it("returns an error if the price is negative", async () => {
  const cookie = await global.signup("yl6r8@example.com");
  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "asdfasdf",
      price: -10,
    })
    .expect(400);
});

it("returns an error if the title is more than 100 characters", async () => {
  const cookie = await global.signup("yl6r8@example.com");
  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "a".repeat(101),
      price: 10,
    })
    .expect(400);
});

it("returns an error if the ticket is created if the user is not authenticated", async () => {
  await request(app)
    .post("/api/tickets")
    .send({
      title: "asdfasdf",
      price: 10,
    })
    .expect(401);
});
