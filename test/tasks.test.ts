import request from "supertest";
import express from "express";
import taskRoutes from "../src/routes/task";
import authRoutes from "../src/routes/auth";
import { UserModel } from "../src/models/user";
import { dbConnect, dbDisconnect } from "./setupTest";
import bcrypt from "bcryptjs";

let userId: string;
let token: string;

const appAuth = express();
appAuth.use(express.json());
appAuth.use("/api/auth", authRoutes);
appAuth.use("/api/tasks", taskRoutes);

beforeAll(async () => {
  await dbConnect();

  const hashedPassword = await bcrypt.hash("testpass123", 10);
  const user = await UserModel.create({
    name: "Task Tester",
    email: "taskuser@example.com",
    password: hashedPassword,
  });
  userId = user._id.toString();

  const res = await request(appAuth).post("/api/auth/login").send({
    email: "taskuser@example.com",
    password: "testpass123",
  });
  token = res.body.token;
  if (!token) throw new Error("Token is undefined, login failed!");
});

afterAll(async () => {
  await dbDisconnect();
});

describe("Task Routes", () => {
  test("GET /api/tasks should return 401 if not authenticated", async () => {
    const response = await request(appAuth).get("/api/tasks");
    expect(response.status).toBe(401);
  });

  test("POST /api/tasks should create a new task", async () => {
    const res = await request(appAuth)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Task for POST test",
        description: "This task is created just for POST test",
        status: "pending",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });

  test("GET /api/tasks/:id should return the created task", async () => {
    const taskRes = await request(appAuth)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Task for GET/:id test",
        description: "This task is created just for GET/:id test",
        status: "pending",
      });

    const taskId = taskRes.body._id;

    const response = await request(appAuth)
      .get(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(taskId);
    expect(response.body.title).toBe("Task for GET/:id test");
    expect(response.body.status).toBe("pending");
  });

  test("PUT /api/tasks/:id should update the task", async () => {
    const taskRes = await request(appAuth)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Task for PUT test",
        description: "This task is created just for PUT test",
        status: "pending",
      });

    const taskId = taskRes.body._id;

    const response = await request(appAuth)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "completed" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "completed");
  });

  test("DELETE /api/tasks/:id should delete the task", async () => {
    const taskRes = await request(appAuth)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Task for DELETE test",
        description: "This task is created just for DELETE test",
        status: "pending",
      });

    const taskId = taskRes.body._id;

    const response = await request(appAuth)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Task deleted");
  });
});
