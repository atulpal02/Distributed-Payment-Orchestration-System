import pool from "../../config/db";

export async function createPaymentInDB(payment: any) {
  const result = await pool.query(
    `INSERT INTO payments (id, amount, status, idempotency_key)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [payment.id, payment.amount, payment.status, payment.idempotency_key]
  );

  return result.rows[0];
}