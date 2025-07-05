import { Router } from "express";
import { productoRouter } from "./producto/producto.routes";

export class AppRoutes {
    static get routes():Router{

        const router = Router();

        router.use('/api/productos',productoRouter);

        return router;

        
    }
    
}