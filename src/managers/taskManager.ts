import { ObjectId } from "mongodb";
import { TaskModel } from "../models/task";
import { Task } from "../types/task";
import { PaginationManager } from "./paginatonManager";
import { Types } from "mongoose";

export const getTasksByUser = async (
  userId: string,
  page: number,
  limit: number,
) => {
  return await PaginationManager.paginate<Task>({
    model: TaskModel,
    pipeline: [
      {
        $match: {
          userId: new Types.ObjectId(userId),
        },
      },
    ],
    pagination: { page, limit },
  });
};

export const getTaskById = async (taskId: string, userId: string) => {
  return await TaskModel.findOne({ _id: taskId, userId });
};

export const createTask = async (taskData: Partial<Task>) => {
  const task = new TaskModel(taskData);
  await task.save();
  return task;
};

export const updateTask = async (
  taskId: string,
  updateData: Partial<Task>,
  userId: string,
) => {
  const task = await TaskModel.findOneAndUpdate(
    { _id: new Types.ObjectId(taskId), userId: new Types.ObjectId(userId) },
    updateData,
    { new: true },
  );
  return task;
};

export const deleteTask = async (taskId: string, userId: string) => {
  const result = await TaskModel.findOneAndDelete({
    _id: new Types.ObjectId(taskId),
    userId: new Types.ObjectId(userId),
  });
  return result;
};
