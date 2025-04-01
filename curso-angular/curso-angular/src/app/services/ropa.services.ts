import { Injectable } from "@angular/core";
import { log } from "console";

@Injectable()
export class RopaService {
  public nombre_prenda = 'Pantalones vaqueros'
  public coleccion_prenda = ['Poleron Nike', 'Polera Adidas']
  obtenerPrenda(nombre_prenda:string): string{
    return nombre_prenda
  }
  addPrenda(nombre_prenda:string){
    this.coleccion_prenda.push(nombre_prenda)
  }
  deletePrenda(i: number){
    this.coleccion_prenda.splice(i,1)
  }
  get fullCollection(){
    return this.coleccion_prenda
  }
}
