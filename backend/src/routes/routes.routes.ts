import { Router } from "express";
import { productoRouter } from "./producto/producto.routes";
import { userRouter } from "./user/user.routes";

export class AppRoutes {
    static get routes():Router{

        const router = Router();

        router.use('/productos', productoRouter);
        router.use(userRouter);
        return router;
    }
    
}