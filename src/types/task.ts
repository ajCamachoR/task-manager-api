import { ObjectId } from "mongoose";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  completed: boolean;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  userId: ObjectId;
}
