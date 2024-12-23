import { Request, Response } from "express";
const User = require("../models/userModel");
const Todo = require("../models/toDoModel");

// Create a new Todo
const createTodo = async (
  req: Request & { user: { userId: any } },
  res: Response
): Promise<Response> => {
  const reqUser: any = req?.user;
  const { title, description } = req.body;

  if (!reqUser) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Please authenticate." });
  }

  if (!title || !description) {
    return res.status(400).json({
      message: "Please provide all required fields (title, description)",
    });
  }

  try {
    // Check if the user exists
    const user = await User.findById(reqUser.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Create a new Todo
    const newTodo = new Todo({
      title,
      description,
      user: user._id,
    });

    // Save the Todo to the database
    await newTodo.save();

    return res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

// Get all Todos for a specific user
const getTodos = async (
  req: Request & { user: { userId: any } },
  res: Response
): Promise<Response> => {
  const { userId } = req.user;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Please authenticate." });
  }

  try {
    // Find Todos for the given user
    const todos = await Todo.find({ user: userId });
    console.log({todos, userId})

    if (todos.length === 0) {
      return res.status(404).json({ message: "No todos found for this user" });
    }

    return res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

// Update a Todo
const updateTodo = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, isCompleted },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

// Delete a Todo
const deleteTodo = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Invalid todo ID" });
  }

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
