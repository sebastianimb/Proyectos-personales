import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-add-product',
  imports: [],
  providers:[ProductService],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
constructor(
  private _ProvProductService: ProductService
){}
}
