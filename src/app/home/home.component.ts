import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselModule],
  template: `
    <div class="container mx-auto p-8">
      <!-- Contenido -->
      <h2 class="text-3xl font-bold my-8">Bienvenido a Herrashop</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-blue-100 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-4">Productos</h3>
          <p class="mb-4">Explora nuestro catálogo de productos</p>
          <a routerLink="/productos/detail-producto/1" 
             class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Ver Producto de Ejemplo
          </a>
        </div>
        <div class="bg-green-100 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-4">Iniciar Sesión</h3>
          <p class="mb-4">Accede a tu cuenta</p>
          <a routerLink="/login" 
             class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Login
          </a>
        </div>
      </div>
    </div>

    <!-- Carrusel -->
    <p-carousel [value]="imagenes" [numVisible]="1" [circular]="true" [autoplayInterval]="3000">
      <ng-template pTemplate="item" let-img>
        <img [src]="img.imagen" [alt]="img.titulo" class="w-full h-64 object-cover rounded-lg shadow" />
        <div class="text-center mt-2 text-lg font-semibold text-white bg-black bg-opacity-50 rounded py-1">
          {{ img.titulo }}
        </div>
      </ng-template>
    </p-carousel>
  `
})
export class HomeComponent {
  imagenes = [
    { imagen: 'src/assets/imagenes/banners/banner1.png', titulo: 'Ofertas de verano' },
    { imagen: 'src/assets/imagenes/banners/banner2.png', titulo: 'Nuevos Ingresos' },
    { imagen: 'src/assets/imagenes/banners/banner3.png', titulo: 'Herramientas con descuento' }
  ];
}
