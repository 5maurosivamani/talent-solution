import { Request, Response, NextFunction } from "express";
const Todo = require("../models/toDoModel");

const rateLimitMiddleware = async (
  req: Request & { user: { id: string } },
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const currentTime = new Date();

    // Fetch the rate limit entry for the user
    let todos = await Todo.find({ user: userId });

    if (!todos) {
      return next();
    }

    // Filter timestamps within the last 15 minutes
    const timestamps = todos.filter(
      (todo: any) =>
        currentTime.getTime() - new Date(todo.createdAt).getTime() <= 15 * 60 * 1000
    );

    // Check if user has already added 10 items
    if (timestamps.length >= 10) {
      return res.status(429).json({
        success: false,
        message:
          "Rate limit exceeded. Please wait for 3 minutes before adding more items.",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = rateLimitMiddleware;
