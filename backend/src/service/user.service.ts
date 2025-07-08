import { UserRepository } from "../repository/user.repository";
import bcrypt from 'bcryptjs';

export class UserService {
    constructor(private productoRepository: UserRepository) { }

    async obtenerUsuarioPorEmail(email: string, password: string = '') {

        try {

            let user = await this.productoRepository.getUserByEmail(email);
            if (user && password) {
                const encryptedPassword = await bcrypt.hash(password, 10);
                const isMatch = await bcrypt.compare(encryptedPassword, user.password);
                if (!isMatch) {
                    return null; // Contraseña incorrecta
                }
            }
            console.log("paso por aca sin password");
            return user;
        } catch (error) {
            console.error("Error al obtener el usuario por email:", error);
            throw new Error("Error al obtener el usuario por email: " + error.message); 
        }
    }

    async obtenerTodosLosUsuarios() {
            return await this.productoRepository.getAllUsers();
        }

    async crearUsuario(data: any) {

            if (data.password) {
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