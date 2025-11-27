import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../models/usuarios.model.js';

export const listUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};

export const showUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
};

export const storeUser = async (req, res) => {
    try {
        const { nombre, correo, password, rol } = req.body;

        const newUser = await createUser({
            nombre,
            correo,
            password,
            rol
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el usuario" });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo, password, rol } = req.body;

        await updateUser(id, { nombre, correo, password, rol });

        res.json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};

export const destroyUser = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteUser(id);

        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};

