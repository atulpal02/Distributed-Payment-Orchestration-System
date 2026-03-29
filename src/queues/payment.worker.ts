// src/queues/payment.worker.ts

const BullMQ = require("bullmq");
const IORedis = require("ioredis");
const pool = require("../config/db").default;

// create dedicated redis connection (REQUIRED)
const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

const worker = new BullMQ.Worker(
  "payment",
  async (job: any) => {
    const { paymentId } = job.data;

    console.log("Processing payment:", paymentId);

    const success = Math.random() > 0.3;

    await pool.query(
      `UPDATE payments SET status=$1 WHERE id=$2`,
      [success ? "SUCCESS" : "FAILED", paymentId]
    );

    console.log(
      `Payment ${paymentId} → ${success ? "SUCCESS" : "FAILED"}`
    );
  },
  {
    connection,
  }
);

module.exports = worker;