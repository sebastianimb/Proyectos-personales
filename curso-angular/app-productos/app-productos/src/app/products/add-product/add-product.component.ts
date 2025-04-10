import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  providers:[ProductService],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  titulo= 'Añadir un producto'
  inputProductAdd: Product = {
    id: 0,
    title:'',
    description:'',
    category:'',
    price:0,
    stock:1,
    brand: '',
    sku:'',
  }
  productAdd!: Product
  constructor(
    private _ProvProductService: ProductService
  ){}
  addProduct(product: Product){
    return this._ProvProductService.addProducts(product).subscribe({
      next: (result: Product)=>{this.productAdd = result},
      error:(error)=>{console.error(error)},
      complete: ()=>{console.log('Se ha añadido un nuevo producto.');
      }
    })
  }
  onSubmit(){
    this.addProduct(this.inputProductAdd)
  }
}
