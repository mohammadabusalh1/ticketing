import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { jest, beforeAll, beforeEach, afterAll } from "@jest/globals";
import type { Response } from "supertest";

// Create mock functions outside the factory to ensure they're shared
const mockPublish = jest.fn((subject: string, data: string, callback: () => void) => {
  callback();
});
const mockOn = jest.fn();
const mockClose = jest.fn();

const mockClient = {
  publish: mockPublish,
  on: mockOn,
  close: mockClose,
};

// Use jest.unstable_mockModule for ESM compatibility
// This must be called before any imports of the mocked module
jest.unstable_mockModule('../nats-wrapper.ts', () => {
  return {
    NatsWrapper: class {
      static readonly client = mockClient;
      static getClient() {
        return this.client;
      }
      static connect() {
        return Promise.resolve(this.client);
      }
    },
  };
});

declare global {
  var signup: (email: string) => Promise<string[]>;
  var logErrorResponse: (response: Response) => void;
  var expectWithErrorLog: (response: Response, expectedStatus: number) => void;
}

let mongo: any;

beforeAll(async () => {
  jest.clearAllMocks();
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  // Clear mocks but preserve the mock function references
  mockPublish.mockClear();
  mockOn.mockClear();
  mockClose.mockClear();
  
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
globalThis.signup = async (email: string): Promise<string[]> => {
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

/**
 * Helper function to log error response details when tests fail.
 * Use this when you get unexpected status codes to see the actual error message.
 * @param {Response} response - The supertest response object
 */
globalThis.logErrorResponse = (response: Response) => {
  console.log("\n=== ERROR RESPONSE DETAILS ===");
  console.log("Status:", response.status);
  console.log("Body:", JSON.stringify(response.body, null, 2));
  console.log("Text:", response.text);
  console.log("==============================\n");
};

/**
 * Helper function that expects a status code and automatically logs error details if it doesn't match.
 * Usage: const response = await request(app).post(...); expectWithErrorLog(response, 201);
 * @param {Response} response - The supertest response object
 * @param {number} expectedStatus - The expected HTTP status code
 */
globalThis.expectWithErrorLog = (response: Response, expectedStatus: number) => {
  if (response.status !== expectedStatus) {
    globalThis.logErrorResponse(response);
  }
  expect(response.status).toBe(expectedStatus);
};
