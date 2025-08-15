// tests/authRoutes.test.ts
import request from "supertest";
import express from "express";
import authRoutes from "../src/routes/auth";
import "./setupTest";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Auth Routes", () => {
  test("POST /api/auth/register should register a new user", async () => {
    const user = {
      name: "Auth Tester",
      email: "authuser@example.com",
      password: "authpass123",
    };
    const res = await request(app).post("/api/auth/register").send(user);
    expect([200, 201]).toContain(res.status);
    expect(res.body.email).toBe(user.email);
  });

  test("POST /api/auth/register should not register duplicate user", async () => {
    const user = {
      name: "Auth Tester",
      email: "authuser@example.com",
      password: "authpass123",
    };

    await request(app).post("/api/auth/register").send(user);

    const res = await request(app).post("/api/auth/register").send(user);
    expect([400, 409]).toContain(res.status);
  });

  test("POST /api/auth/login should login with correct credentials", async () => {
    const user = {
      name: "Auth Tester",
      email: "authuser@example.com",
      password: "authpass123",
    };

    // Registrar el usuario para login
    await request(app).post("/api/auth/register").send(user);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password: user.password });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("POST /api/auth/login should not login with wrong password", async () => {
    const user = {
      name: "Auth Tester",
      email: "authuser@example.com",
      password: "authpass123",
    };

    // Registrar el usuario para login
    await request(app).post("/api/auth/register").send(user);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password: "wrongpass" });
    expect(res.status).toBe(401);
  });

  test("GET /api/auth/logout should return 200", async () => {
    const response = await request(app).get("/api/auth/logout");
    expect(response.status).toBe(200);
  });
});
