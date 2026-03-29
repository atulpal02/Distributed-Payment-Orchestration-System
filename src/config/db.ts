import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",   // keep this
  database: "payments",
  password: "password",
  port: 5432,
});

export default pool;