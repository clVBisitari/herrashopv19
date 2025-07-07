import { prisma } from "../prisma";

export class UserRepository {

    async getUserById(id: number) {
        return await prisma.usuario.findUnique({
            where: { id }
        })
    }
    async getAllUsers() {
        return await prisma.usuario.findMany();
    }
    async createUser(data: any) {
        return await prisma.usuario.create({
            data
        });
    }
    async updateUser(id: number, data: any) {
        return await prisma.usuario.update({
            where: { id },
            data
        });
    }
    async deleteUser(id: number) {
        return await prisma.usuario.delete({
            where: { id }
        });
    }
}