import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();

router.get('/AllUsers',  UserController.getAllUsers);
router.get('/',  UserController.getPageUser);
router.get('/:id', UserController.showUser);
router.post('/', UserController.storeUser);
router.patch('/:id', UserController.updateUserController);
router.delete('/:id', UserController.destroyUser);

export default router;