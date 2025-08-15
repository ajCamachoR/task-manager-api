import express from "express";
import dotenv from "dotenv";

dotenv.config();

import taskRoutes from "./routes/task";
import authRoutes from "./routes/auth";
import { connectDB } from "./utils/database";
import { PORT, MONGO_URI } from "./config/config";

const app = express();

app.use(express.json());

// Example routes (to be implemented)
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// MongoDB connection

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;
