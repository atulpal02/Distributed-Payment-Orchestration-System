## Distributed Payment Orchestration System

A fault-tolerant backend system that simulates a real-world payment gateway with asynchronous processing, idempotency, and scalable architecture. The system is designed to handle payment workflows reliably under concurrent requests and failure scenarios.

## Overview

#This project models how modern payment systems work internally:

Accept payment requests via REST APIs
Ensure idempotency to prevent duplicate charges
Process payments asynchronously using queues
Update payment status via background workers
Maintain system reliability under failures
⚙️ Tech Stack
Backend: Node.js (TypeScript), Express
Database: PostgreSQL
Queue & Caching: Redis, BullMQ
Infrastructure: Docker
APIs: REST
🏗️ Architecture
```
Client → API Server → PostgreSQL
                  ↓
               Redis Queue
                  ↓
               Worker Service → PostgreSQL

```


#🔄 System Workflow
1. Payment Creation
Client sends request:
POST /payments
Server:
Generates payment_id
Stores payment with status CREATED
Applies idempotency check
Pushes job to Redis queue
2. Asynchronous Processing
Worker consumes job from queue
Simulates payment processing (success/failure)
Updates payment status:
CREATED → PROCESSING → SUCCESS / FAILED
3. Idempotency Handling
Each request includes:
idempotency-key
If duplicate request arrives:
System returns cached response
Prevents duplicate transactions
#🔐 Key Features
✅ Idempotency

Prevents duplicate payment creation under retries or network issues.

✅ Asynchronous Processing

Decouples request handling from processing using Redis queues.

✅ Distributed Architecture

Separates API and worker services for scalability.

✅ Fault Isolation

Failures in processing do not affect API responsiveness.

#📦 Project Structure
src/
├── config/          # DB and Redis configs
├── modules/
│   ├── payment/     # Payment logic
│   ├── idempotency/ # Idempotency middleware
├── queues/          # Queue + worker
├── app.ts
├── server.ts
#🐳 Setup Instructions
1. Start Infrastructure
docker-compose up -d
2. Install Dependencies
npm install
3. Start Server
npm run dev
4. Start Worker
npm run worker
#🧪 Test API
```
curl -X POST http://localhost:3000/payments \
-H "Content-Type: application/json" \
-H "idempotency-key: test123" \
-d '{"amount":100}'

```
📊 Example Response
```
{
  "id": "uuid",
  "amount": 100,
  "status": "CREATED"
}

```
🔍 Verify Processing
Check worker logs:
```
Processing payment: <id>
Payment <id> → SUCCESS
```
Check DB:
```
SELECT * FROM payments;
```
