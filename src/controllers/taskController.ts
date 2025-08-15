import { Request, Response } from "express";
import * as taskManager from "../managers/taskManager";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { page = 0, limit = 10 } = req.query;
    const result = await taskManager.getTasksByUser(
      userId,
      Number(page),
      Number(limit),
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const task = await taskManager.getTaskById(req.params.id, userId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch task" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const task = await taskManager.createTask({ ...req.body, userId });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: "Failed to create task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const updated = await taskManager.updateTask(
      req.params.id,
      req.body,
      userId,
    );
    if (!updated) return res.status(404).json({ message: "Task not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const deleted = await taskManager.deleteTask(req.params.id, userId);
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete task" });
  }
};
