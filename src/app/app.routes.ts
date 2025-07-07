import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'register', 
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
    // loadChildren: () => import('./register/register.routes').then(m => m.registerRoutes),
    // component: RegisterComponent 
  },
  {
    path: 'productos',
    loadChildren: () => import('./modules/productos/pages/productos.routes').then(e => e.productosRoutes)
  },
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full'
  // }
];
