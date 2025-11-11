import request from "supertest";
import { app } from "../../app.ts";
import "../../test/setup.ts";

it("returns a list of tickets", async () => {
  const cookie = await global.signup("yl6r8@example.com");

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "asdfasdf", price: 10 })
    .expect(201);

  const response = await request(app)
    .get("/api/tickets")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(1);
  expect(response.body[0].title).toEqual("asdfasdf");
  expect(response.body[0].price).toEqual(10);
});
