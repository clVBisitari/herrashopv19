import { Router } from "express";
import { ProductoController } from "../../controller/producto.controller";

export const productoRouter = Router();

const productoController = new ProductoController();
productoRouter.get('/', productoController.getAllProductos.bind(productoController));
productoRouter.get('/:id', productoController.getProducto.bind(productoController));
productoRouter.post('/', productoController.crearProducto.bind(productoController));