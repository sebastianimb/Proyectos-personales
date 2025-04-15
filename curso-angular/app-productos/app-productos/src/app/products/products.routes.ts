import { Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { DetailProductComponent } from "./detail-product/detail-product.component";
export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: ':id',
    component: DetailProductComponent
  },
  {
    path: 'agregar',
    component: AddProductComponent
  }
]
