import { Routes } from '@angular/router';

export const productosRoutes: Routes = [
  {
    path: '',
      loadComponent: () => import('./productos/productos.component').then(m => m.ProductosComponent),
  },
  {
    path: 'detail-producto/:id',
    loadComponent: () => import('./detail-producto/detail-producto.component').then(m => m.DetailProductoComponent)
  }
];