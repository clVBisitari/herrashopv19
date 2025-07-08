import { Router } from "express";
import { UserController as UserController } from "../../controller/user.controller";

export const userRouter = Router();

const userController = new UserController();

userRouter.post('/login', userController.logIn.bind(userController));
userRouter.get('/usuarios', userController.getTodosLosUsuarios.bind(userController));
userRouter.post('/crearusuario', userController.crearUsuario);
userRouter.put('/actualizar/:id', userController.updateUsuario.bind(userController));
userRouter.delete('/eliminar/:id', userController.eliminarUsuario.bind(userController));

export default userRouter;