# DevOps Microservice

REST microservice with JWT authentication, load balancing, and full CI/CD pipeline.

---

## Architecture

```
Internet → Nginx (Load Balancer) → App Node 1
                                 → App Node 2
```

- **Runtime**: Node.js 18 + Express
- **Auth**: API Key + JWT (unique per transaction)
- **Containerization**: Docker (multi-stage build)
- **Orchestration**: Docker Compose (local) / Kubernetes (cloud)
- **CI/CD**: GitHub Actions (Build → Test → Docker Push → Deploy Test → Deploy Production)
- **Static Analysis**: ESLint
- **Testing**: Jest + Supertest + Coverage enforced at 80%

---

## Endpoint

### `POST /DevOps`

**Headers required:**

| Header | Value |
|---|---|
| `X-Parse-REST-API-Key` | `2f5ae96c-b558-4c7b-a590-a501ae1c3f6c` |
| `X-JWT-KWY` | Valid JWT (generate with `node scripts/generate-jwt.js`) |
| `Content-Type` | `application/json` |

**Request body:**
```json
{
  "message": "This is a test",
  "to": "Juan Perez",
  "from": "Rita Asturia",
  "timeToLifeSec": 45
}
```

**Response:**
```json
{
  "message": "Hello Juan Perez your message will be sent"
}
```

Any other HTTP method returns `ERROR` with status `405`.

---

## Quick Start

### Local (Docker Compose)

```bash
# 1. Clone the repo
git clone https://github.com/GiruCorps/HelloMessage/
cd devops-microservice

# 2. Start (load balancer + 2 app nodes)
docker-compose up --build

# 3. Generate JWT and test
JWT=$(node scripts/generate-jwt.js)

curl -X POST \
  -H "X-Parse-REST-API-Key: 2f5ae96c-b558-4c7b-a590-a501ae1c3f6c" \
  -H "X-JWT-KWY: ${JWT}" \
  -H "Content-Type: application/json" \
  -d '{"message":"This is a test","to":"Juan Perez","from":"Rita Asturia","timeToLifeSec":45}' \
  http://localhost:8080/DevOps
```

### Local (Node.js only)

```bash
npm install
npm start
```

---

## Running Tests

```bash
# All tests with coverage
npm test

# Watch mode
npm run test:watch

# Lint
npm run lint
```

Coverage threshold: **80%** (branches, functions, lines, statements).

---

## CI/CD Pipeline

```
Push to master
  ↓
1. Build & Lint (ESLint static analysis)
  ↓
2. Test (Jest + Coverage report)
  ↓
3. Docker Build & Push → GitHub Container Registry
  ↓
4. Deploy → Staging (SSH + smoke test)
  ↓
5. Deploy → Production (auto after staging passes)
```
---

## Kubernetes (Cloud)

```bash
# Apply all manifests
kubectl apply -f k8s/deployment.yaml

# Check pods
kubectl get pods -n devops-microservice

# Auto-scaling: HPA scales 2–10 replicas based on CPU/memory
kubectl get hpa -n devops-microservice
```
