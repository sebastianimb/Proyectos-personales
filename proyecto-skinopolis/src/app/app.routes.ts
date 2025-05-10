import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./products/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'productos',
    loadChildren: () =>
      import('./products/products.routes').then((m) => m.PRODUCTS_ROUTES),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/error/error.component').then(
        (m) => m.ErrorComponent
      ),
  },
];
