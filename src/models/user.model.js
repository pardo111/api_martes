import pool from '../config/database.js';

export const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows;
};

export const getUserById = async (id) => {
    const [rows] = await pool.query(
        "SELECT * FROM usuarios WHERE id = ?",
        [id]
    );
    return rows[0];
};

export const createUser = async ({ nombre, correo, password, rol }) => {
    const [result] = await pool.query(
        'INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, ?)',
        [nombre, correo, password, rol]
    );

    return {
        id: result.insertId,
        nombre,
        correo,
        rol
    };
};

export const updateUser = async (id, { nombre, correo, password, rol }) => {
    await pool.query(
        'UPDATE usuarios SET nombre = ?, correo = ?, password = ?, rol = ? WHERE id = ?',
        [nombre, correo, password, rol, id]
    );

    return { message: "Usuario actualizado correctamente" };
};


export const deleteUser = async (id) => {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    return { message: "Usuario eliminado" };
};

export const isAdmin = async (id) => {
    const [rows] = await pool.query(
        "SELECT rol FROM usuarios WHERE id = ?",
        [id] 
    );
    if (rows.length === 0) return false;

    return rows[0].rol === "admin";
};