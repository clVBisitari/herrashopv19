import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';
import { CarritoItem } from '../../../interfaces/carrito.interface';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit, OnDestroy {
  carritoService = inject(CarritoService);
  
  carritoItems: CarritoItem[] = [];
  total: number = 0;
  cantidadTotal: number = 0;
  private carritoSubscription?: Subscription;

  ngOnInit() {
    this.carritoSubscription = this.carritoService.carrito$.subscribe(items => {
      this.carritoItems = items;
      this.total = this.carritoService.obtenerTotal();
      this.cantidadTotal = this.carritoService.obtenerCantidadTotal();
    });
  }

  ngOnDestroy() {
    if (this.carritoSubscription) {
      this.carritoSubscription.unsubscribe();
    }
  }

  actualizarCantidad(itemId: number, nuevaCantidad: number) {
    if (nuevaCantidad > 0) {
      this.carritoService.actualizarCantidad(itemId, nuevaCantidad);
    }
  }

  eliminarItem(itemId: number) {
    this.carritoService.eliminarDelCarrito(itemId);
  }

  vaciarCarrito() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      this.carritoService.vaciarCarrito();
    }
  }
  obtenerTotal(): number {
    return this.carritoService.obtenerTotal();
  }
}
