import { Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";
import { AddProductComponent } from "./add-product/add-product.component";
export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'agregar',
    component: AddProductComponent
  }
]
