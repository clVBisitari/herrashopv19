// src/interfaces/carrito-item.interface.ts
export interface CarritoItem {
  id: number;
  productoId: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
  subtotal: number;
}