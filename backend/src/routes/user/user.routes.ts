import { Router } from "express";
import { UserController as UserController } from "../../controller/user.controller";

export const productoRouter = Router();

const productoController = new UserController();

productoRouter.get('/login', productoController.logIn.bind(productoController));
productoRouter.get('/usuarios', productoController.getTodosLosUsuarios.bind(productoController));
productoRouter.post('/crearusuario', productoController.crearUsuario.bind(productoController));
productoRouter.put('/actualizar/:id', productoController.updateUsuario.bind(productoController));
productoRouter.delete('/eliminar/:id', productoController.eliminarUsuario.bind(productoController));