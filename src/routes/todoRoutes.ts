const express = require("express");
const todoController = require("../controllers/todoController");
const { authenticate } = require("../middleware/authMiddleware");
const rateLimitMiddleware = require("../middleware/rateLimitMiddleware");

const todoRouter = express.Router();

// Get all todos
todoRouter.get("/", authenticate, todoController.getTodos);

// create a new todo
todoRouter.post("/", authenticate,rateLimitMiddleware, todoController.createTodo);

// update a todo by id
todoRouter.put("/:id", authenticate, todoController.updateTodo);

// delete a todo
todoRouter.delete("/:id", authenticate, todoController.deleteTodo);

module.exports = todoRouter;
