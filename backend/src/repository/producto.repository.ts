import { prisma } from "../prisma";

export class ProductoRepository {
    async obtenerTodos() {
        return await prisma.producto.findMany();
    }

    async getProductoById(id: number) {
        return await prisma.producto.findUnique({
            where: { id }
        })
    }
}