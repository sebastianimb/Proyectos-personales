import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
interface deleteResponse {
  isDeleted: boolean;
  deleteOn: string;
}
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  providers: [ProductService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  titulo = 'Iventario disponible';
  productDelete!: Product & deleteResponse;
  productList: Array<Product> = [];
  confirm: number | undefined = undefined;
  constructor(private _ProvProductService: ProductService) {}
  ngOnInit() {
    this._ProvProductService.getProducts().subscribe({
      next: (result: ProductsResponse) => {
        this.productList = result.products;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Llamado a servicio de listado de producto exitoso.');
      },
    });
  }
  deleteConfirm(id: number) {
    this.confirm = id;
  }
  cancelDelete() {
    this.confirm = undefined;
  }
  deleteProduct(id: number) {
    this._ProvProductService.deleteProduct(id).subscribe({
      next: (response: Product & deleteResponse) => {
        this.productDelete = response;
      },
      error: () => {},
      complete: () => {},
    });
    this.confirm = undefined;
  }
}
