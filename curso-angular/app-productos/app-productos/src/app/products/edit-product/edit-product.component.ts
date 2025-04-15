import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  imports: [FormsModule],
  providers:[ProductService],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
  standalone:true,
})
export class EditProductComponent {
  titulo= 'Editar un producto'
  id!: string
  inputProductEdit: Product = {
    title:'',
    description:'',
    category:'',
    price:0,
    stock:1,
    brand: '',
  }
  productEdit!: Product
  selectedFiles: File[] = [];
  constructor(
    private _ProvProductService: ProductService,
    private _router: Router,
    private _route: ActivatedRoute
  ){}
  ngOnInit(){
    this.id = this._route.snapshot.paramMap.get('id')!
    this.getProductById()
  }
  getProductById(){
    this._ProvProductService.getDetails(this.id).subscribe({
      next:(response: Product)=>{this.inputProductEdit= response},
      error: ()=>{this._router.navigate(['/productos'])},
      complete: ()=>{console.log('Se ha obtenido detalles del producto exitosamente.');
      }
    })
  }
  backToProduct(){
    this._router.navigate(['/productos'])
  }
  onFileChange(event: Event){
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length>0) {
      this.selectedFiles = Array.from(input.files)
    }
  }
  onSubmit(){
    if (this.selectedFiles.length > 0) {
      this.uploadFiles()
      this.editProduct()
    } else {
      this.editProduct()
    }
    console.log(this.productEdit);
  }
  editProduct(){
    this._ProvProductService.editProducts(this.id,this.inputProductEdit).subscribe({
      next: (response: Product)=>{ this.productEdit = response},
      error: ()=>{this._router.navigate(['/productos'])},
      complete: ()=>{console.log('El producto ha sido editado correctamente.');
      }
    })
  }
  uploadFiles() {
    this._ProvProductService.uploadFiles(this.selectedFiles).subscribe({
      next: (response) => { console.log('Archivos subidos:', this.inputProductEdit.images = response.images); },
      error: (error) => { console.error('Error al subir los archivos:', error); },
    });
    this.inputProductEdit.images = this.selectedFiles.map((file)=> file.name)
    console.log(this.inputProductEdit);

  }
}
