import { prisma } from "../prisma";

export class ProductoRepository {
    async crearProducto(data: {
        nombre: string;
        descripcion: string;
        clasificacion: string;
        precio: number;
        stock: number;
        imagen: string;
    }) {
        return await prisma.producto.create({
            data
        });
    }
    async obtenerTodos() {
        return await prisma.producto.findMany();
    }

    async getProductoById(id: number) {
        return await prisma.producto.findUnique({
            where: { id }
        })
    }
}