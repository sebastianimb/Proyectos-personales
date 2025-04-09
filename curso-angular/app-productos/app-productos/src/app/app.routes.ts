import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./products/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/error/error.component').then(m => m.ErrorComponent)
  }
];

