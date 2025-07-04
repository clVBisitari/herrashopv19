import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto p-8">
      <h2 class="text-3xl font-bold mb-6">Bienvenido a Herrashop</h2>
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
  `
})
export class HomeComponent { }
