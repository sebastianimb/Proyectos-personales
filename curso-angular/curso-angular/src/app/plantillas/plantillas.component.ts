import { Component } from "@angular/core";

@Component({
  selector: 'plantillas',
  templateUrl: './plantillas.component.html',
  standalone: false,
})
export class PlantillasComponent{
  public titulo: string
  public administrador: boolean
  public datosExternos = 'soy un dato de la clase padre.'
  public tituloExterno = ''
  constructor(){
    this.titulo = 'Hola plantilla'
    this.administrador = true
  }
  cambiar(){
    this.administrador = !this.administrador
  }
  suscribeTitle(titulo: string){
    this.tituloExterno=titulo
  }
}
