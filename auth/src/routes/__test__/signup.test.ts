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
