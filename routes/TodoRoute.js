import express from "express";
import {
  getTodos,
  getTodosSoftDelete,
  getCompletedTodo,
  getTodoById,
  saveTodo,
  updateTodo,
  deleteTodo,
  permananentDelete,
  activeTodo,
  completedTodo,
} from "../controller/TodoController.js";
import verifyAuth from "../middleware/VerifyAuth.js"


const router = express.Router();

router.use(verifyAuth);

router.get("/todos", getTodos);
router.get("/todos/trash", getTodosSoftDelete);
router.get("/todos/completed", getCompletedTodo)
router.get("/todos/:id", getTodoById);
router.post("/todos", saveTodo);
router.post("/todos/:id", completedTodo);
router.patch("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);
router.delete("/todos/trash/:id", permananentDelete);
router.delete("/todos/completed/:id", permananentDelete);
router.patch("/todos/trash/:id", activeTodo);

export default router;
