import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { UserRepository } from '../repository/user.repository';
import { isStringObject } from 'node:util/types';
import { UserModel } from '../models/user.model';

export class UserController {
    private userService: UserService;
    private userSafe: UserModel;

    constructor() {
        const productoRepository = new UserRepository();
        this.userService = new UserService(productoRepository);
    }

    public logIn = async (req: Request, res: Response) => {
        try {
            const email = String(req.body.email);
            console.log('Email recibido:', email);
            if (isStringObject(email)) {
                return res.status(400).json({ message: 'usuario inválido' });
            }

            const user = await this.userService.obtenerUsuarioPorEmail(email);
            this.userSafe = {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                telefono: user.telefono.toString(),
                direccion: user.direccion,
                ciudad: user.ciudad,
                pais: user.pais,
                codigo_postal: user.codigo_postal,
                fecha_registro: user.fecha_registro,
                rol: user.rol
            };
            console.log(this.userSafe);

            if (!user) {
                return res.status(404).json({ message: 'usuario no encontrado' });
            }
            
            res.status(200).json(this.userSafe);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener el usuario', error });
        }
    }

    public getTodosLosUsuarios = async (req: Request, res: Response) => {
        try {
            const productos = await this.userService.obtenerTodosLosUsuarios();
            res.status(200).json(productos);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener los usuarios', error });
        }
    }

    public crearUsuario = async (req: Request, res: Response) => {
        try {
            
            const {
                nombre,
                email,
                telefono,
                direccion,
                ciudad,
                pais,
                codigo_postal,
                password,
                rol
            } = req.body;
            const nuevoUsuario = {
                nombre : nombre,
                email: email,
                telefono: BigInt(telefono),
                direccion: direccion,
                ciudad : ciudad,
                pais: pais,
                codigo_postal: codigo_postal,
                password: password,
                rol: rol || 'user'
            };
            const nuevoUser = await this.userService.crearUsuario(nuevoUsuario);
            const userTypeSafe = {
                id: nuevoUser.id,
                nombre: nuevoUser.nombre,
                email: nuevoUser.email,
                telefono: nuevoUser.telefono.toString(),
                direccion: nuevoUser.direccion,
                ciudad: nuevoUser.ciudad,
                pais: nuevoUser.pais,
                codigo_postal: nuevoUser.codigo_postal,
                fecha_registro: nuevoUser.fecha_registro,
                rol: nuevoUser.rol
            }
            console.log('Nuevo usuario creado:', userTypeSafe);
            res.status(201).json(userTypeSafe);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al crear el usuario', error });
        }
    }

    public updateUsuario = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const data = req.body;
            const productoActualizado = await this.userService.actualizarUsuario(id, data);
            res.status(200).json(productoActualizado);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al actualizar el usuario', error });
        }
    }
    public getUsuarioPorEmail = async (req: Request, res: Response) => {
        try {
            console.log(req.params);
            const email = String(req.params.email);
            console.log('Email recibido:', email);
            if (!email) {
                return res.status(400).json({ message: 'usuario inválido' });
            }

            const user = await this.userService.obtenerUsuarioPorEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'usuario no encontrado' });
            }
            
            const userTypeSafe = {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                telefono: user.telefono.toString(),
                direccion: user.direccion,
                ciudad: user.ciudad,
                pais: user.pais,
                codigo_postal: user.codigo_postal,
                fecha_registro: user.fecha_registro,
                rol: user.rol
            };
            console.log(userTypeSafe);
            res.status(200).json(userTypeSafe);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener el usuario', error });
        }
    }

    public eliminarUsuario = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            await this.userService.eliminarUsuario(id);
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al eliminar el usuario', error });
        }
    }
}