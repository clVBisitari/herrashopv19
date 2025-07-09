import { prisma } from '../prisma';

export class FavoritoRepository {

  async obtenerFavoritosPorUsuario(usuarioId: number) {
    return await prisma.productoFavorito.findMany({
      where: { usuarioId },
      include: {
        producto: true,
      },
    });
  }

  async agregarFavorito(usuarioId: number, productoId: number) {
    console.log('Agregando favorito:', { usuarioId, productoId });
    const favoritoExistente = await prisma.productoFavorito.findFirst({
      where: {
        usuarioId,
        productoId,
      },
    });
    console.log('Favorito existente:', favoritoExistente);

    if (!favoritoExistente) {
      return await prisma.productoFavorito.create({
        data: { usuarioId, productoId },
      });
    }
  }

  async eliminarFavorito(usuarioId: number, productoId: number) {
    console.log('Eliminando favorito:', { usuarioId, productoId });
    const favorito = await prisma.productoFavorito.findFirst({
      where: {
        usuarioId,
        productoId,
      },
    });

    if (!favorito) throw new Error('Favorito no encontrado');

    await prisma.productoFavorito.delete({
      where: {
        id: favorito.id,
      },
    });
  }

}
