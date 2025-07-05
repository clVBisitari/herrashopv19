import { ProductoRepository } from "../repository/producto.repository";

export class ProductoService {
    constructor(private productoRepository: ProductoRepository) {}

    async obtenerProductoPorId(id: number) {
        return await this.productoRepository.getProductoById(id);
    }
}