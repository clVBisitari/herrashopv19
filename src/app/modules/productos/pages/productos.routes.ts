import { Routes } from '@angular/router';
import { DetailProductoComponent } from './detail-producto/detail-producto.component';

export const productosRoutes: Routes = [
  {
    path: 'detail-producto/:id',
    component: DetailProductoComponent
  }
]; 