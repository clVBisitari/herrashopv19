export interface User {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    pais: string;
    codigo_postal: string;
    fecha_registro: Date;
    rol: 'admin' | 'user';
}