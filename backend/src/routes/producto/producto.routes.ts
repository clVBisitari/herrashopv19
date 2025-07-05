import { Router } from "express";
import { ProductoController } from "../../controller/producto.controller";

export const productoRouter = Router();

const productoController = new ProductoController();

productoRouter.get('/:id', productoController.getProducto.bind(productoController));