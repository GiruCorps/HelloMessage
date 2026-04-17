const request = require("supertest");
const app = require("../src/app");
const jwt = require("jsonwebtoken");

const apiKey = "2f5ae96c-b558-4c7b-a590-a501ae1c3f6c";
const secret = "supersecret";

process.env.API_KEY = apiKey;
process.env.JWT_SECRET = secret;

const validBody = {
  "message": "This is a test",
  "to": "Juan Perez",
  "from": "Rita Asturia",
  "timeToLifeSec": 45
};

const generateToken = () => {
  return jwt.sign(
    { transactionId: 'test-transaction', iat: Math.floor(Date.now() / 1000) },
    secret,
    { expiresIn: '5m' }
  );
};

const myToken = generateToken();

describe("DevOps API", () => {

  test("✅ Success Response", async () => {
    const res = await request(app)
      .post("/DevOps")
      .set("X-Parse-REST-API-Key", apiKey)
      .set("X-JWT-KWY", myToken)
      .set("Content-Type", "application/json")
      .send(validBody);

    console.log('Token generado:', myToken);
    console.log('Body:', secret);
    console.log('Respuesta:', res)
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain("Hello");
  });

  test("✅ Service Health", async () => {
    const res = await request(app)
      .get("/health")
    
    expect(res.statusCode).toBe(200);
  });

  test("✅ Balancer request", async () => {
    const res = await request(app)
      .get("/balancer")
    
    expect(res.statusCode).toBe(200);
  });

  test("❌ Missing API key", async () => {
    const res = await request(app)
      .post("/DevOps")
      .set("X-JWT-KWY", myToken)
      .send(validBody);

    expect(res.statusCode).toBe(401);
  });

  test("❌ Invalid API key", async () => {
    const res = await request(app)
      .post("/DevOps")
      .set("X-Parse-REST-API-Key", "wrong")
      .set("X-JWT-KWY", myToken)
      .send(validBody);

    expect(res.statusCode).toBe(401);
  });

  test("❌ Invalid body", async () => {
    const res = await request(app)
      .post("/DevOps")
      .set("X-Parse-REST-API-Key", apiKey)
      .set("X-JWT-KWY", myToken)
      .send({});

    expect(res.statusCode).toBe(400);
  });

  test("❌ Missing JWT", async () => {
    const res = await request(app)
      .post("/DevOps")
      .set("X-Parse-REST-API-Key", apiKey)
      .send(validBody);

    expect(res.statusCode).toBe(401);
  });

  test("❌ Invalid JWT", async () => {
    const res = await request(app)
      .post("/DevOps")
      .set("X-Parse-REST-API-Key", apiKey)
      .set("X-JWT-KWY", "invalid")
      .send(validBody);

    expect(res.statusCode).toBe(401);
  });

});