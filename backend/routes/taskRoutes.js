import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const taskRouter=express.Router();
// Create a task
taskRouter.post("/", createTask);

// Get all tasks
taskRouter.get("/", getAllTasks);

// Get a single task by ID
taskRouter.get("/:id", getTaskById);

// Update task by ID
taskRouter.put("/:id", updateTask);

// Delete task by ID
taskRouter.delete("/:id", deleteTask);

export default taskRouter;
