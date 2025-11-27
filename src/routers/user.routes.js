import { Router } from "express";
import {
    listUsers,
    showUser,
    storeUser,
    updateUserController,
    destroyUser
} from "../controllers/user.controller.js";

const router = Router();

router.get('/admin-dashboard', isAdminMiddleware, controllerFunction, listUsers);
router.get('/:id', showUser);
router.post('/', storeUser);
router.put('/:id', updateUserController);
router.delete('/:id', destroyUser);

export default router;