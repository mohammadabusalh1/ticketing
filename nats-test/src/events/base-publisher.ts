import type { Stan } from "node-nats-streaming";
import Channels = require("./channels");

interface Event {
  Channel: Channels;
  data: any;
}

abstract class Publisher<T extends Event> {
  abstract subject: T["Channel"];
  protected client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T["data"], callback: () => void) {
    this.client.publish(this.subject, JSON.stringify(data), callback);
  }
}

export = Publisher;
