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
    title:'',
    description:'',
    category:'',
    price:0,
    stock:1,
    brand: '',
  }
  productAdd!: Product
  selectedFiles: File[] = [];
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
    this.uploadFiles()
    this.addProduct(this.inputProductAdd)
  }
  onFileChange(event: Event){
    // this.selectedFiles = <Array<Files>>event.target.files
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length>0) {
      this.selectedFiles = Array.from(input.files)
    }
  }
  uploadFiles() {
    if (this.selectedFiles.length > 0) {
      this._ProvProductService.uploadFiles(this.selectedFiles).subscribe({
        next: (response) => { console.log('Archivos subidos:', response); },
        error: (error) => { console.error('Error al subir los archivos:', error); },
      });
    } else {
      console.warn('No se han seleccionado archivos.');
    }
  }
}
