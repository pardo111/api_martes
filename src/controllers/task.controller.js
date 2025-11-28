import { is } from 'zod/locales';
import Task from '../models/task.model.js';
import User from '../models/user.model.js';

const TaskController = Object.freeze({

    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.getAllTasks();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los tasks" });
        }
    },


    getTaskById: async (req, res) => {
        try {
            const { id } = req.params;
            const task = await Task.getTaskById(id);

            if (!task) {
                return res.status(404).json({ message: "Task no encontrado" });
            }

            res.json(task);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el task" });
        }
    },

    getPageTask: async (req, res) => {
        try {
            const { offset, limit } = req.query;
            const page = await Task.getPageTask(limit, offset);
            res.status(200).json({
                data: page
            })
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el task" });
        }
    },

    createTask: async (req, res) => {
        try {
            const { titulo, descripcion, estado, user_id } = req.body;
            const isAdmin = await User.isAdmin(user_id);
            console.log(isAdmin)


            const newTask = await Task.createTask({
                titulo,
                descripcion,
                estado,
                user_id
            });

            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ error: "Error al crear el task"  });
        }
    },

    //ahuevo tengo que mandarle todos los parametros porque sino queda null el campo que no vaya con los parametros

    updateTask: async (req, res) => {
        try {
            const { id } = req.params;
            const { titulo, descripcion, estado, user_id } = req.body;


            await Task.updateTask(id, { titulo, descripcion, estado });

            res.json({ message: "Task actualizado correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el task: "  });
        }
    },



    deleteTask: async (req, res) => {
        const { id, user_id } = req.params;
        const task = await Task.getTaskById(id);
        if (!task) return res.status(404).json({ error: "Task no encontrado" });

        await deleteTask(id);
        res.json({ message: "Task eliminado" });
    }
});


export default TaskController;