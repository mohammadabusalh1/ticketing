import type { Stan } from "node-nats-streaming";
import type { Channels } from "./channels.js";

interface Event {
  Channel: Channels;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T["Channel"];
  protected client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T["data"], callback: () => void) {
    this.client.publish(this.subject, JSON.stringify(data), callback);
  }
}
