const { v4: uuidv4 } = require("uuid");
import { createPaymentInDB } from "./payment.repository";
import { enqueuePayment } from "../../queues/payment.queue";

export async function createPayment(data: any) {
  const payment = {
    id: uuidv4(),
    amount: data.amount,
    status: "CREATED",
    idempotency_key: data.idempotency_key,
  };

  const saved = await createPaymentInDB(payment);

  await enqueuePayment(saved.id);

  return saved;
}