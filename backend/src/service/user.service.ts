import { UserRepository } from "../repository/user.repository";

export class UserService {
    constructor(private productoRepository: UserRepository) {}

    async obtenerUsuarioPorId(id: number) {
        return await this.productoRepository.getUserById(id);
    }
    async obtenerTodosLosUsuarios() {
        return await this.productoRepository.getAllUsers();
    }
    async crearUsuario(data: any) {
        return await this.productoRepository.createUser(data);
    }
    async actualizarUsuario(id: number, data: any) {
        return await this.productoRepository.updateUser(id, data);
    }
    async eliminarUsuario(id: number) {
        return await this.productoRepository.deleteUser(id);
    }
}