const request = require("supertest");
const app = require("../src/app");
const jwt = require("jsonwebtoken");

const apiKey = "2f5ae96c-b558-4c7b-a590-a501ae1c3f6c";
const secret = "supersecret";

const validBody = {
  "message": "This is a test",
  "to": "Juan Perez",
  "from": "Rita Asturia",
  "timeToLifeSec": 45
};

// const tokenJWT = require("../scripts/generate-jwt.js");


const generateToken = () => {
  return jwt.sign(
    { transactionId: 'test-transaction', iat: Math.floor(Date.now() / 1000) },
    secret,
    { expiresIn: '5m' }
  );
};
  //  jwt.sign({ user: "test" }, secret, { expiresIn: 60 });

const myToken = generateToken();

describe("DevOps API", () => {

  test("✅ success response", async () => {
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

  test("Salud", async () => {
    const res = await request(app)
      .get("/health")
    
    expect(res.statusCode).toBe(200);
  });

  test("Balanceador", async () => {
    const res = await request(app)
      .get("/balancer")
    
    expect(res.statusCode).toBe(200);
  });
//   test("❌ missing API key", async () => {
//     const res = await request(app)
//       .post("/DevOps")
//       .set("X-JWT-KWY", generateToken())
//       .send(validBody);

//     expect(res.statusCode).toBe(401);
//   });

//   test("❌ invalid API key", async () => {
//     const res = await request(app)
//       .post("/DevOps")
//       .set("X-Parse-REST-API-Key", "wrong")
//       .set("X-JWT-KWY", generateToken())
//       .send(validBody);

//     expect(res.statusCode).toBe(401);
//   });

//   test("❌ invalid body", async () => {
//     const res = await request(app)
//       .post("/DevOps")
//       .set("X-Parse-REST-API-Key", apiKey)
//       .set("X-JWT-KWY", generateToken())
//       .send({});

//     expect(res.statusCode).toBe(401);
//   });

//   test("❌ missing JWT", async () => {
//     const res = await request(app)
//       .post("/DevOps")
//       .set("X-Parse-REST-API-Key", apiKey)
//       .send(validBody);

//     expect(res.statusCode).toBe(401);
//   });

//   test("❌ invalid JWT", async () => {
//     const res = await request(app)
//       .post("/DevOps")
//       .set("X-Parse-REST-API-Key", apiKey)
//       .set("X-JWT-KWY", "invalid")
//       .send(validBody);

//     expect(res.statusCode).toBe(401);
//   });

});