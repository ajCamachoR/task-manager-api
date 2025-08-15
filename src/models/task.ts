import { Schema, model } from "mongoose";
import { Task } from "../types/task";

const taskSchema = new Schema<Task>(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true },
);

export const TaskModel = model<Task>("Task", taskSchema);
