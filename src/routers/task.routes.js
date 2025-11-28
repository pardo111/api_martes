import { Router } from "express";
import TaskController from "../controllers/task.controller.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";
import { TaskSchema } from "../schemas/Task.schema.js";
import { validate } from "../middleware/TaskBody.middleware.js";

const router = Router();

router.get('/Alltasks', TaskController.getAllTasks);
router.get('/', TaskController.getPageTask);
router.get('/:id', TaskController.getTaskById);
router.post('/', validate(TaskSchema), isAdmin, TaskController.createTask);
router.patch('/:id',validate(TaskSchema), isAdmin, TaskController.updateTask);
router.delete('/:id',validate(TaskSchema), isAdmin, TaskController.deleteTask);

export default router;