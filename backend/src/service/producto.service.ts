import { ProductoRepository } from "../repository/producto.repository";

export class ProductoService {
    constructor(private productoRepository: ProductoRepository) { }


    async crearProducto(data: {
        nombre: string;
        descripcion: string;
        clasificacion: string;
        precio: number;
        stock: number;
        imagen: string;
    }) {
        return await this.productoRepository.crearProducto(data);
    }

    async obtenerProductoPorId(id: number) {
        return await this.productoRepository.getProductoById(id);
    }
    async obtenerTodosLosProductos() {
        return await this.productoRepository.obtenerTodos();
    }

}