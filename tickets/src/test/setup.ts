import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app.ts";
import jwt from "jsonwebtoken";

declare global {
  var signup: (email: string) => Promise<string[]>;
}

let mongo: any;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  const { db } = mongoose.connection;
  if (!db) return;
  const collections = await db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

/**
 * Signs up a user with the given email and generates a JWT cookie.
 * Returns the cookie string.
 * @param {string} email - The user's email address
 * @returns {Promise<string[]>} The cookie string in an array format
 */
global.signup = async (email: string): Promise<string[]> => {
  // Generate a JWT payload
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: email,
  };

  // Create a JWT
  const token = jwt.sign(payload, process.env.JWT_SECRET || "default_jwt_key");

  // Build session object
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // Return a string that's the cookie with the encoded data
  return [`session=${base64}`];
};
