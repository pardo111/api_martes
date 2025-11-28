import pool from '../config/database.js';

const Task = Object.freeze({

    getAllTasks: async () => {
        const [rows] = await pool.query('SELECT * FROM tareas WHERE estado = 1');
        return rows;
    },

    getPageTask: async (limit, offset) => {
        const [rows] = await pool.query(`
                        SELECT * FROM tareas where estado =1 LIMIT ? OFFSET ?  ;
            `, [Number(limit), Number(offset)]);

        return rows;
    },

    getTaskById: async (id) => {
        const [rows] = await pool.query(
            "SELECT * FROM tareas WHERE id_tareas = ? AND estado = 1",
            [id]
        );
        return rows[0];
    },

    createTask: async ({ titulo, descripcion, estado, user_id }) => {
        const [result] = await pool.query(
            'INSERT INTO tareas (titulo, descripcion, estado_actividad, id_usuarios) VALUES (?, ?, ?,?)',
            [titulo, descripcion, estado, user_id]
        );

        return {
            id: result.insertId,
            titulo,
            descripcion,
            estado,
            user_id
        };
    },
    updateTask: async (id, { titulo, descripcion, estado }) => {
        return await pool.query(
            'UPDATE tareas SET titulo = ?, descripcion = ?, estado_actividad = ? WHERE id_tareas = ?',
            [titulo, descripcion, estado, id]
        );
    },



    deleteTask: async (id) => {
        await pool.query('UPDATE tareas SET estado = 0 WHERE id = ?', [id]);
        return { message: "Task eliminado" };
    }
});




export default Task;