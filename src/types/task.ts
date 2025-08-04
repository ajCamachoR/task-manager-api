import { ObjectId } from "mongoose";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  userId: ObjectId;
}
