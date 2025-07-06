import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../../services/carrito.service';
import { CarritoItem } from '../../../interfaces/carrito.interface';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  carritoService = inject(CarritoService);
  
  carritoItems: CarritoItem[] = [];
  total: number = 0;
  cantidadTotal: number = 0;

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.carritoItems = this.carritoService.obtenerItems();
    this.total = this.carritoService.obtenerTotal();
    this.cantidadTotal = this.carritoService.obtenerCantidadTotal();
  }

  actualizarCantidad(itemId: number, nuevaCantidad: number) {
    this.carritoService.actualizarCantidad(itemId, nuevaCantidad);
    this.cargarCarrito(); 
  }

  eliminarItem(itemId: number) {
    this.carritoService.eliminarDelCarrito(itemId);
    this.cargarCarrito(); 
  }

  vaciarCarrito() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      this.carritoService.vaciarCarrito();
      this.cargarCarrito(); 
    }
  }

}
