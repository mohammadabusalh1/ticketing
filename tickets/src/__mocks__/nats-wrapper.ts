import { jest } from "@jest/globals";

export class NatsWrapper {
  static readonly client = {
    publish: jest.fn((subject: string, data: string, callback: () => void) => {
      callback();
    }),
    on: jest.fn(),
    close: jest.fn(),
  };

  static getClient() {
    return this.client;
  }

  static connect() {
    return Promise.resolve(this.client);
  }
}
