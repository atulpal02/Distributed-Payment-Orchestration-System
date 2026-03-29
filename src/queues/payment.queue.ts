import { Queue } from "bullmq";
import redis from "../config/redis";

export const paymentQueue = new Queue("payment", {
  connection: redis,
});

export async function enqueuePayment(paymentId: string) {
  await paymentQueue.add("processPayment", { paymentId });
}
