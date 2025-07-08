import { UserRepository } from "../repository/user.repository";
import bcrypt from 'bcryptjs';

export class UserService {
    constructor(private productoRepository: UserRepository) {}

    async obtenerUsuarioPorId(id: number) {
        return await this.productoRepository.getUserById(id);
    }
    async obtenerTodosLosUsuarios() {
        return await this.productoRepository.getAllUsers();
    }
    async crearUsuario(data: any) {
        
        if(data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        return await this.productoRepository.createUser(data);
    }
    async actualizarUsuario(id: number, data: any) {
        return await this.productoRepository.updateUser(id, data);
    }
    async eliminarUsuario(id: number) {
        return await this.productoRepository.deleteUser(id);
    }
}