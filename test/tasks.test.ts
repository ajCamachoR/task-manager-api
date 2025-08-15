import request from "supertest";
import express from "express";
import taskRoutes from "../src/routes/task";
import authRoutes from "../src/routes/auth";
import { UserModel } from "../src/models/user";
import { dbConnect, dbDisconnect } from "./setupTest";
import { fakeAuthMiddleware } from "./setupMiddleware";

let userId: string;
const app = express();
app.use(express.json());

beforeAll(async () => {
  await dbConnect();

  const user = await UserModel.create({
    name: "Task Tester",
    email: "taskuser@example.com",
    password: "testpass123",
  });
  userId = user._id.toString();

  // Using fake midleware
  app.use("/api/tasks", fakeAuthMiddleware(userId), taskRoutes);
});

afterAll(async () => {
  await dbDisconnect();
});

describe("Task Routes", () => {
  test("GET /api/tasks should return 401 if not authenticated", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.status).toBe(401);
  });

  test("POST /api/tasks should create a new task", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("GET /api/tasks should return paginated tasks", async () => {
    const response = await request(app).get("/api/tasks?page=1&limit=10");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.pagination).toHaveProperty("total");
    expect(response.body.pagination).toHaveProperty("currentPage");
  });

  test("GET /api/tasks/:id should return the created task", async () => {
    const taskRes = await request(app).post("/api/tasks").send({
      title: "Task for GET test",
      description: "This task is created just for the GET/:id test",
      status: "pending",
    });

    const taskId = taskRes.body._id;

    const response = await request(app).get(`/api/tasks/${taskId}`);

    // 3️⃣ Validar
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(taskId);
    expect(response.body.title).toBe("Task for GET test");
    expect(response.body.status).toBe("pending");
  });

  test("PUT /api/tasks/:id should update the task", async () => {
    const taskRes = await request(app).post("/api/tasks").send({
      title: "Task for GET test",
      description: "This task is created just for the GET/:id test",
      status: "pending",
    });

    const taskId = taskRes.body._id;

    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ status: "completed" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "completed");
  });

  test("DELETE /api/tasks/:id should delete the task", async () => {
    const taskRes = await request(app).post("/api/tasks").send({
      title: "Task for GET test",
      description: "This task is created just for the GET/:id test",
      status: "pending",
    });

    const taskId = taskRes.body._id;
    const response = await request(app).delete(`/api/tasks/${taskId}`);
    expect(response.status).toBe(200);
  });
});
