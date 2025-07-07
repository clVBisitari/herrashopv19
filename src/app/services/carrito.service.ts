import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; //sirve para verificar si estamos en el navegador o en el servidor
import { BehaviorSubject } from 'rxjs';
import { CarritoItem } from '../interfaces/carrito.interface';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoItems: CarritoItem[] = [];
  
  // ✅ AGREGAR ESTOS OBSERVABLES:
  private carritoItemsSubject = new BehaviorSubject<CarritoItem[]>([]);
  private cantidadTotalSubject = new BehaviorSubject<number>(0);
  private totalSubject = new BehaviorSubject<number>(0);
  
  // Observables públicos
  carritoItems$ = this.carritoItemsSubject.asObservable();
  cantidadTotal$ = this.cantidadTotalSubject.asObservable();
  total$ = this.totalSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarCarritoDesdeLocalStorage();
    }
  }

  private cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carritoItems = JSON.parse(carritoGuardado);
      this.notificarCambios(); // ✅ NUEVO
    }
  }

  // ✅ MÉTODO NUEVO - Este es la clave:
  private notificarCambios() {
    this.carritoItemsSubject.next([...this.carritoItems]);
    this.cantidadTotalSubject.next(this.obtenerCantidadTotal());
    this.totalSubject.next(this.obtenerTotal());
  }

  private guardarEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.carritoItems));
    this.notificarCambios(); // ✅ AGREGAR ESTA LÍNEA
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
    
    this.guardarEnLocalStorage(); // ✅ ESTO NOTIFICA LOS CAMBIOS
  }

  actualizarCantidad(itemId: number, nuevaCantidad: number) {
    if (nuevaCantidad <= 0) {
      this.eliminarDelCarrito(itemId);
      return;
    }
    
    const item = this.carritoItems.find(item => item.id === itemId);
    if (item) {
      item.cantidad = nuevaCantidad;
      item.subtotal = item.precio * nuevaCantidad;
      this.guardarEnLocalStorage(); // ✅ AGREGAR
    }
  }

  eliminarDelCarrito(itemId: number) {
    this.carritoItems = this.carritoItems.filter(item => item.id !== itemId);
    this.guardarEnLocalStorage(); // ✅ AGREGAR
  }

  vaciarCarrito() {
    this.carritoItems = [];
    this.guardarEnLocalStorage(); // ✅ AGREGAR
  }

  obtenerItems(): CarritoItem[] {
    return this.carritoItems;
  }

  obtenerTotal(): number {
    return this.carritoItems.reduce((total, item) => total + item.subtotal, 0);
  } //lo que hace el reduce es definir el total y el item, y va sumando el subtotal de cada item al total

  obtenerCantidadTotal(): number {
    return this.carritoItems.reduce((total, item) => total + item.cantidad, 0);
  } //mismo que arriba pero con cantidad de items
}