import { Router } from 'express';
import { FavoritoController } from '../../controller/favorito.controller';

const favoritoRouter = Router();
const favoritoController = new FavoritoController();

favoritoRouter.get('/usuario/:usuarioId', favoritoController.getFavoritosPorUsuario);
favoritoRouter.post('/', favoritoController.agregarFavorito);
favoritoRouter.delete('/', favoritoController.eliminarFavorito);

export default favoritoRouter;
