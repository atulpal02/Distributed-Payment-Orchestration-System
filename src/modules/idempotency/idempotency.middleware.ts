import redis from "../../config/redis";

export async function idempotencyMiddleware(req: any, res: any, next: any) {
  const key = req.headers["idempotency-key"];

  if (!key) {
    return res.status(400).json({ error: "Missing idempotency key" });
  }

  const cached = await redis.get(key);

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const originalSend = res.send.bind(res);

  res.send = (body: any) => {
    redis.set(key, JSON.stringify(body), "EX", 3600);
    return originalSend(body);
  };

  next();
}