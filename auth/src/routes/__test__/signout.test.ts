import request from "supertest";
import { app } from "../../app.ts";
import "../../test/setup.ts";

it("clears the cookie after signing out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "Yl6r8@example.com",
      password: "Password1!",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
