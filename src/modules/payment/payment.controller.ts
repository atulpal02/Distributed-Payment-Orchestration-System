import { Router } from "express";
import { createPayment } from "./payment.service";

const router = Router();

router.post("/", async (req, res) => {
  const payment = await createPayment(req.body);
  res.json(payment);
});

export default router;