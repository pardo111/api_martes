import User from '../models/user.model.js';


const UserController = Object.freeze({

    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los usuarios" });
        }
    },

    getPageUser: async (req, res) => {
        try {
            const { limit, offset } = req.query;
            const users = await User.getPagUser(limit, offset);
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el usuario"});
        }
    },

    showUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.getUserById(id);

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el usuario" });
        }
    },

    storeUser: async (req, res) => {
        try {
            const { nombre, correo, password, rol } = req.body;

            const newUser = await User.createUser({
                nombre,
                correo,
                password,
                rol
            });

            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: `Error al crear el usuario\n ${error}` });
        }
    },
    updateUserController: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, correo, password, rol } = req.body;

            await User.updateUser(id, { nombre, correo, password, rol });

            res.json({ message: "Usuario actualizado correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el usuario" });
        }
    },
    destroyUser: async (req, res) => {
        try {
            const { id } = req.params;

            await User.deleteUser(id);

            res.json({ message: "Usuario eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el usuario" });
        }
    }

});


export default UserController;