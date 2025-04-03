import { Component } from "@angular/core";
import { RopaService } from "../services/ropa.services";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  standalone:false,
  providers:[RopaService]
})

export class HomeComponent {
  public titulo: string = 'Home Component'
  public listado_ropa: Array<string> = []
  public prendaGuardar: string = ''
  public fecha: Date
  constructor(
    private _ropaService: RopaService,
  ){
    this.fecha= new Date()
  }
  ngOnInit(){
    this.listado_ropa = this._ropaService.fullCollection
  }
  guardarPrenda(){
    this._ropaService.addPrenda(this.prendaGuardar)
    this.prendaGuardar = ''
  }
  eliminarPrenda(i:number){
    this._ropaService.deletePrenda(i)
  }
}
