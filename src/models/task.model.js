import { id } from 'zod/locales';
import pool from '../config/database.js';

export const getAllTasks = async () => {
    const [rows] = await pool.query('SELECT * FROM tacks');
    return rows;
};

export const getTaskById = async (id) => {
    const [rows] = await pool.query(
        "SELECT * FROM tasks WHERE id = ?",
        [id]
    );
    return rows[0];
};

export const createTask = async ({ titulo, descripcion, estado }) => {
    const [result] = await pool.query(
        'INSERT INTO tasks (titulo, descripcion, estado) VALUES (?, ?, ?)',
        [titulo, descripcion, estado]
    );

    return {
        id: result.insertId,
        titulo,
        descripcion,
        estado
    };
};

export const updateTask = async (id, { titulo, descripcion, estado }) => {
    await pool.query(
        'UPDATE tasks SET titulo = ?, descripcion = ?, estado = ? WHERE id = ?',
        [titulo, descripcion, estado, id]
    );

    return { message: "Task actualizado correctamente" };
};

export const deleteTask = async (id) => {
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    return { message: "Task eliminado" };
};

