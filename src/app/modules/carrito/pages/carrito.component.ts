import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../../services/carrito.service';
import { CarritoItem } from '../../../interfaces/carrito.interface';
import { Subscription } from 'rxjs';

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

  private subscriptions: Subscription[] = [];

  ngOnInit() {
    // ✅ SUSCRIBIRSE A LOS OBSERVABLES EN LUGAR DE cargarCarrito():
    this.subscriptions.push(
      this.carritoService.carritoItems$.subscribe(items => {
        this.carritoItems = items;
      }),
      
      this.carritoService.total$.subscribe(total => {
        this.total = total;
      }),
      
      this.carritoService.cantidadTotal$.subscribe(cantidad => {
        this.cantidadTotal = cantidad;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // ✅ REMOVER cargarCarrito() - ya no es necesario

  actualizarCantidad(itemId: number, nuevaCantidad: number) {
    this.carritoService.actualizarCantidad(itemId, nuevaCantidad);
    // ✅ REMOVER this.cargarCarrito() - se actualiza automáticamente
  }

  eliminarItem(itemId: number) {
    this.carritoService.eliminarDelCarrito(itemId);
    // ✅ REMOVER this.cargarCarrito() - se actualiza automáticamente
  }

  vaciarCarrito() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      this.carritoService.vaciarCarrito();
      // ✅ REMOVER this.cargarCarrito() - se actualiza automáticamente
    }
  }

  procederAlCheckout() {
    if (this.carritoItems.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de proceder al checkout.');
    }
  }
}
