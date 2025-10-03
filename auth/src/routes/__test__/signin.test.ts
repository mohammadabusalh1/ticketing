import request from "supertest";
import { app } from "../../app.ts";
import "../../test/setup.ts";

it("returns a 201 on successful signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "Yl6r8@example.com",
      password: "Password1!",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "Yl6r8@example.com",
      password: "Password1!",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});

it("returns a 400 with an invalid email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "Yl6r8@example.com",
      password: "Password1!",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "testtest.com",
      password: "Password1!",
    })
    .expect(400);

  expect(response.get("Set-Cookie")).toBeUndefined();
});

it("returns a 400 with an invalid password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "Yl6r8@example.com",
      password: "Password1!",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signin")
    .send({
      email: "Yl6r8@example.com",
      password: "p",
    })
    .expect(400);
});
