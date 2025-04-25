import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  standalone:true,
  providers:[ProductService],
  imports: [],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent {
  titulo = 'Detalle del producto'
  producto!: Product
  id!: string
  constructor(
    private _ProvProductService: ProductService,
    private _router: Router,
    private _route: ActivatedRoute
  ){}
  ngOnInit(){
    //this._router.navigate(['/home'])
    this.id=this._route.snapshot.paramMap.get('id')!
    this.getDetailsProduct()
  }
  backToProduct(){
    this._router.navigate(['/productos'])
  }
  getDetailsProduct(){
    this._ProvProductService.getDetails(this.id).subscribe({
      next: (response: Product)=>{ this.producto = response},
      error: ()=>{this._router.navigate(['/productos'])},
      complete: ()=>console.log('Obtención de detalle realizada con exito.')

    })
  }
}
