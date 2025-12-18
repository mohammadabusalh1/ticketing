import stan from "node-nats-streaming";
type Stan = ReturnType<typeof stan.connect>;


export class NatsWrapper {
  static client?: Stan;

  static getClient(): Stan {
    if (!this.client) {
      throw new Error("Cannot access NATS client before connecting");
    }
    return this.client;
  }

  static connect(clusterId: string, clientId: string, url: string) {
    if (this.client) {
      throw new Error("Cannot connect to NATS more than once");
    }

    this.client = stan.connect(clusterId, clientId, { url });

    return new Promise((resolve, reject) => {
      this.client!.on("connect", () => {
        console.log("Connected to NATS");
        resolve(this.client);
      });
      this.client!.on("error", (err) => {
        reject(err);
      });
    });
  }
}
