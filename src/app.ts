import express from "express";
import paymentRoutes from "./modules/payment/payment.controller";
import { idempotencyMiddleware } from "./modules/idempotency/idempotency.middleware";

const app = express();

app.use(express.json());

app.use("/payments", idempotencyMiddleware);
app.use("/payments", paymentRoutes);

export default app;