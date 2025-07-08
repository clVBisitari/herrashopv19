import { Router } from "express";
import { productoRouter } from "./producto/producto.routes";
import { userRouter } from "./user/user.routes";
import favoritoRoutes from './favorito/favorito.routes';

export class AppRoutes {
    static get routes():Router{

        const router = Router();

        router.use('/api/productos',productoRouter);
        router.use('/api/favoritos', favoritoRoutes);
        router.use(userRouter);
        return router;
    }
    
}