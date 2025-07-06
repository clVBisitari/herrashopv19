import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { CarritoItem } from '../interfaces/carrito.interface';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoItems: CarritoItem[] = [];
  private carritoSubject = new BehaviorSubject<CarritoItem[]>([]);
  
  carrito$ = this.carritoSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

    if (isPlatformBrowser(this.platformId)) {
      this.cargarCarritoLocalStorage();
    }
  }

  agregarAlCarrito(producto: Producto, cantidad: number = 1) {
    const itemExistente = this.carritoItems.find(item => item.productoId === producto.id);
    
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
      itemExistente.subtotal = itemExistente.precio * itemExistente.cantidad;
    } else {
      const nuevoItem: CarritoItem = {
        id: Date.now(),
        productoId: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad,
        imagen: producto.imagen,
        subtotal: producto.precio * cantidad
      };
      this.carritoItems.push(nuevoItem);
    }

    this.actualizarCarrito();
  }

  actualizarCantidad(itemId: number, nuevaCantidad: number) {
    const item = this.carritoItems.find(item => item.id === itemId);
    if (item) {
      item.cantidad = nuevaCantidad;
      item.subtotal = item.precio * nuevaCantidad;
      this.actualizarCarrito();
    }
  }

  eliminarDelCarrito(itemId: number) {
    this.carritoItems = this.carritoItems.filter(item => item.id !== itemId);
    this.actualizarCarrito();
  }

  vaciarCarrito() {
    this.carritoItems = [];
    this.actualizarCarrito();
  }

  obtenerTotal(): number {
    return this.carritoItems.reduce((total, item) => total + item.subtotal, 0);
  }

  obtenerCantidadTotal(): number {
    return this.carritoItems.reduce((total, item) => total + item.cantidad, 0);
  }

  obtenerItems(): CarritoItem[] {
    return this.carritoItems;
  }
  
  private actualizarCarrito() {
    this.carritoSubject.next([...this.carritoItems]);
    this.guardarCarritoLocalStorage();
  }

  private guardarCarritoLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('carrito', JSON.stringify(this.carritoItems));
    }
  }

  private cargarCarritoLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        this.carritoItems = JSON.parse(carritoGuardado);
        this.carritoSubject.next([...this.carritoItems]);
      }
    }
  }
}