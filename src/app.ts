import { Application, NextFunction, Request, Response } from "express";
import connectDB from "./connection/db";

const express = require("express");
const cors = require("cors");
const appConfig = require("./config/appConfig");
// Import routes
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/toDoRoutes");

const app: Application = express();

app.use(cors(appConfig.cors));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Authentication routes
app.use("/auth", authRoutes);

// User routes (protected routes)
app.use("/todos", todoRoutes);

// Catch unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
  next();
});

// global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("error", err); 
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

// listen on http://localhost:port
const server = app.listen(appConfig.port, () => {
  console.log(`Server is running on http://localhost:${appConfig.port}`);
});

// Handle error separately using 'error' event listener
server.on("error", (err: Error) => {
  console.error("Error starting the server:", err);
  process.exit(1); // Exit the process if the server fails to start
});
