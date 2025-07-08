export interface Favorito {
  id: number;
  productoId: number;
  userId: number;
  producto?: {
  id: number;
  nombre: string;
  descripcion: string;
  clasificacion: string;
  precio: number;
  stock: number;
  imagen: string;
  };
}