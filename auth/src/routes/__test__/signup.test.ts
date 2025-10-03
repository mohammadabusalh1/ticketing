import request from "supertest";
import { app } from "../../app.ts";
import "../../test/setup.ts";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "Yl6r8@example.com",
      password: "Password1!",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "Password1!",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "Yl6r8@example.com",
      password: "p",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("returns a 400 with missing email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      password: "Password1!",
    })
    .expect(400);
});

it("returns a 400 with missing password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "Yl6r8@example.com",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "Yl6r8@example.com",
      password: "Password1!",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "Yl6r8@example.com",
      password: "Password1!",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "Yl6r8@example.com",
      password: "Password1!",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
