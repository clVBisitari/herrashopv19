import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductoService } from '../../../../services/producto.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Producto } from '../../../../interfaces/producto.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { CarritoService } from '../../../../services/carrito.service';
import { FavoritoService } from '../../../../services/favorito.service';

@Component({
  selector: 'app-detail-producto',
  imports: [CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    TagModule,
    RouterLink
  ],
  templateUrl: './detail-producto.component.html',
  styleUrl: './detail-producto.component.css'
})
export class DetailProductoComponent implements OnInit, OnDestroy{
  productoService = inject(ProductoService); 
  carritoService = inject(CarritoService); 
  activatedRouter = inject(ActivatedRoute);
  favoritoService = inject(FavoritoService);
  
  id: number | null = null;
  producto: Producto | undefined;
  cantidad: number = 1;
  esFavorito: boolean = false;

  ngOnInit() {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'))
    this.getProducto();  
  }

  ngOnDestroy(): void {
    
  }

  getProducto() {
    if (this.id !== null) {
      this.productoService.getProducto(this.id).subscribe({
        next: (data) => {
          this.producto = data;
          console.log(data);
          this.favoritoService.getFavoritos().subscribe((favoritos) => {
          this.esFavorito = favoritos.some(f => f.productoId === this.producto?.id);
});
        }, 
        error: (err) => {
          console.error('Error al cargar producto:', err);
        },
        complete: () => {}
      });
    } else {
      console.error('ID de producto no válido');
    }
  }


  incrementarCantidad() {
    if (this.producto && this.cantidad < this.producto.stock) {
      this.cantidad++;
    } //+
  }

  decrementarCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    } //-
  }

  onCantidadChange(event: any) {
    const value = parseInt(event.target.value);
    if (value >= 1 && this.producto && value <= this.producto.stock) {
      this.cantidad = value;
    } else {
      event.target.value = this.cantidad;
    } //cambiar numero manualmente
  }
toggleFavorito() {
  if (!this.producto) return;

  const productoId = this.producto.id;

  if (this.esFavorito) {
    this.favoritoService.eliminarFavorito(productoId).subscribe(() => {
      this.esFavorito = false;
    });
  } else {
    this.favoritoService.agregarFavorito(productoId).subscribe(() => {
      this.esFavorito = true;
    });
  }
}
  agregarAlCarrito() {
    if (this.producto && this.cantidad > 0) {
      this.carritoService.agregarAlCarrito(this.producto, this.cantidad);

      alert(`${this.producto.nombre} agregado al carrito`);
      

      this.cantidad = 1;
    }
  }
}