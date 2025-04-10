import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
interface ProductsResponse {
  products: Product[]; // Producto[] ya representa la lista de productos
  total: number;
  skip: number;
  limit: number;
}
@Component({
  selector: 'app-product-list',
  standalone:true,
  imports: [],
  providers: [ProductService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  titulo= 'Listado de productos'
  productList: Array<Product> = []
  constructor(private _ProvProductService: ProductService){}
  ngOnInit(){
    this._ProvProductService.getProducts().subscribe({
      next: (result: ProductsResponse)=>{ this.productList= result.products},
      error: (error)=>{console.error(error)},
      complete: ()=>{console.log('Llamado a servicio de listado de producto exitoso.');
      }
    })
  }
}
