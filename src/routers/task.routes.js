import { Router } from "express";
import {
    listTasks,
    showTask,
    storeTask,
    updateTaskController,
    destroyTask
} from "../controllers/task.controller.js";

const router = Router();

router.get('/tasks', listTasks);
router.get('/task/:id', showTask);
router.post('/tasks', storeTask);
router.put('/task/:id', updateTaskController);
router.delete('/task/:id', destroyTask);

export default router;