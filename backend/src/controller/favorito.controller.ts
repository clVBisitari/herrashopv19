import { Request, Response } from 'express';
import { FavoritoService } from '../service/favorito.service';
import { FavoritoRepository } from '../repository/favorito.repository';

export class FavoritoController {
  private favoritoService: FavoritoService;

  constructor() {
    const favoritoRepository = new FavoritoRepository();
    this.favoritoService = new FavoritoService(favoritoRepository);
  }

  public getFavoritosPorUsuario  = async (req: Request, res: Response) => {
    try {
      const usuarioId = Number(req.params.usuarioId);

      if (isNaN(usuarioId)) {
        return res.status(400).json({ message: 'ID de usuario inválido' });
      }

      const productos = await this.favoritoService.obtenerFavoritos(usuarioId);
      res.status(200).json(productos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener favoritos', error });
    }
  };

  public agregarFavorito = async (req: Request, res: Response) => {
    try {
      const { usuarioId, productoId } = req.body;

      if (isNaN(usuarioId) || isNaN(productoId)) {
         return res.status(400).json({ message: 'ID de usuario o producto inválido' });
      }

      const favorito = await this.favoritoService.agregarFavorito(usuarioId, productoId);
      res.status(200).json(favorito);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar favorito', error });
    }
  };

  public eliminarFavorito = async (req: Request, res: Response) => {
    try {
      const usuarioId = Number(req.query.usuarioId);
      const productoId = Number(req.query.productoId);

      if (isNaN(usuarioId) || isNaN(productoId)) {
        return res.status(400).json({ message: 'ID inválido' });
      }

      await this.favoritoService.eliminarFavorito(usuarioId, productoId);
      res.status(200).json({ message: 'Favorito eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar favorito', error });
    }
  };
}
