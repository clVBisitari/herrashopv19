import { FavoritoRepository } from '../repository/favorito.repository';

export class FavoritoService {
  constructor(private favoritoRepository: FavoritoRepository) {}

  async obtenerFavoritos(usuarioId: number) {
    const favoritos = await this.favoritoRepository.obtenerFavoritosPorUsuario(usuarioId);
    return favoritos.map(f => f.producto); 
  }

  async agregarFavorito(usuarioId: number, productoId: number) {
    return await this.favoritoRepository.agregarFavorito(usuarioId, productoId);
  }

  async eliminarFavorito(usuarioId: number, productoId: number) {
    return await this.favoritoRepository.eliminarFavorito(usuarioId, productoId);
  }
}
