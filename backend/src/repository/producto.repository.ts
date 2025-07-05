import { prisma } from "../prisma";

export class ProductoRepository {

    async getProductoById(id: number) {
        return await prisma.producto.findUnique({
            where: { id }
        })
    }
}