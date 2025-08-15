import { Request, Response, NextFunction } from "express";

// Middleware to simulate logged user
export const fakeAuthMiddleware = (userId: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    (req as any).user = { id: userId };
    next();
  };
};
