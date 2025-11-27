import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from '../models/task.model.js';

export const listTasks = async (req, res) => {
    try {
        const tasks = await getAllTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los tasks" });
    }
};

export const showTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await getTaskById(id);

        if (!task) {
            return res.status(404).json({ message: "Task no encontrado" });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el task" });
    }
};

export const storeTask = async (req, res) => {
    try {
        const { titulo, descripcion, estado } = req.body;

        const newTask = await createTask({
            titulo,
            descripcion,
            estado
        });

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el task" });
    }
};

export const updateTaskController = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, estado } = req.body;

        await updateTask(id, { titulo, descripcion, estado });

        res.json({ message: "Task actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el task" });
    }
};

export const destroyTask = async (req, res) => {
    if (!(await verifyAdmin(req, res))) return;

    const { id } = req.params;

    const task = await getTaskById(id);
    if (!task) return res.status(404).json({ error: "Task no encontrado" });

    await deleteTask(id);
    res.json({ message: "Task eliminado" });
};