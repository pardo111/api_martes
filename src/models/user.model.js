import pool from '../config/database.js';

const User = Object.freeze({


    getAllUsers: async () => {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE estado =1');
        return rows;
    },

    getPagUser: async (limit, offset) => {
        const [rows] = await pool.query(
            "SELECT * FROM usuarios WHERE estado =1 LIMIT ? OFFSET ?  ",
            [Number(limit), Number(offset)]
        );

        return rows;
    },



    getUserById: async (id) => {
        const [rows] = await pool.query(
            "SELECT * FROM usuarios WHERE id_usuarios = ? AND estado =1",
            [id]
        );
        return rows[0];
    },

    createUser: async ({ nombre, correo, password, rol }) => {
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
    },
    updateUser: async (id, { nombre, correo, password, rol }) => {
        await pool.query(
            'UPDATE usuarios SET nombre = ?, correo = ?, password = ?, rol = ? WHERE id_usuarios = ?',
            [nombre, correo, password, rol, id]
        );

        return { message: "Usuario actualizado correctamente" };
    },
    isAdmin: async (id) => {
        const [rows] = await pool.query(
            "SELECT rol FROM usuarios WHERE id_usuarios = ?",
            [id]
        );
        if (rows.length === 0) return false;

        return rows[0].rol === "admin";
    },

    deleteUser: async (id) => {
        await pool.query(
            'UPDATE usuarios SET estado = 0 where id_usuarios = ?',
             [id]);
        return { message: "Usuario eliminado" };
    }

});


export default User;