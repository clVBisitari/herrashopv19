import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { FavoritoService } from '../../services/favorito.service';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../interfaces/producto.interface';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgForOf,
    ButtonModule,
    TooltipModule,
    RouterLink
  ],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  favoritos = signal<any[]>([]);
  cargando = true;

  constructor(
    private favoritoService: FavoritoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.favoritoService.getFavoritos().subscribe({
      next: (res) => {
        this.favoritos.set(res);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar favoritos:', err);
        this.cargando = false;
      }
    });
  }

  eliminar(id: number): void {
    console.log('Eliminando favorito con ID:', id);
    this.favoritoService.eliminarFavorito(id).subscribe({
      next: () => {
        const actual = this.favoritos();
        this.favoritos.set(actual.filter(f => f.id !== id));
      },
      error: (err) => {
        console.error('Error al eliminar favorito:', err);
      }
    });
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarAlCarrito(producto, 1);
    alert(`Producto ${producto.nombre} agregado al carrito`);
  }
}
