import User from "../models/user.model.js";

export const isAdmin = async (req, res, next) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ error: "Se requiere user_id" });
        }

        const admin = await User.isAdmin(user_id);

        if (!admin) {
            return res.status(403).json({ error: "No tiene permisos (no es admin)" });
        }

        next(); 
    } catch (error) {
        res.status(500).json({ error: "Error al validar permisos: " + error });
    }
};
