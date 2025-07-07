import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CarritoComponent } from './modules/carrito/pages/carrito.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'productos',
    loadChildren: () => import('./modules/productos/pages/productos.routes').then(e => e.productosRoutes)
  },
  {
    path: 'carrito',
    component: CarritoComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
