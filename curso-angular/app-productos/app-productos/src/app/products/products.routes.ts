import { Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { DetailProductComponent } from "./detail-product/detail-product.component";
import { EditProductComponent } from "./edit-product/edit-product.component";
export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'agregar',
    component: AddProductComponent
  },
  {
    path: 'editar/:id',
    component: EditProductComponent
  },
  {
    path: ':id',
    component: DetailProductComponent
  },
]
