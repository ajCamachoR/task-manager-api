/** @format */

// src/index.ts
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// Rutas
// app.use('/api/tasks', taskRoutes);
// app.use('/api/auth', authRoutes);

// Conectar base de datos
mongoose
  .connect("mongodb://localhost:27017/tasks")
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(3000, () => console.log("🚀 Server on http://localhost:3000"));
  })
  .catch((err) => console.error("❌ DB Error", err));
