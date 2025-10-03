import request from "supertest";
import { app } from "../../app.ts";
import "../../test/setup.ts";

it("returns details about the current user", async () => {
  const cookie = await global.signup("yl6r8@example.com");

  const currentUserResponse = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(currentUserResponse.body.currentUser.email).toEqual(
    "yl6r8@example.com"
  );
});

it("returns null if not authenticated", async () => {
  await request(app).get("/api/users/currentuser").send().expect(401);

  // expect(currentUserResponse.body.currentUser).toEqual(null);
});
