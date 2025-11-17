import type { Message, Stan } from "node-nats-streaming";
import type { Channels } from "./channels.js";

interface Event {
  Channel: Channels;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T["Channel"];
  abstract queueGroupName: string;
  protected ackWait = 5 * 1000; // 5 seconds

  protected client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDeliverAllAvailable()
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }

  abstract onMessage(data: T["data"], msg: Message): void;
}
