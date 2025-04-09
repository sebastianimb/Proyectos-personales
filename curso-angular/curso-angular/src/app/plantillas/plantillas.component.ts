import { Component } from "@angular/core";

@Component({
  selector: 'plantillas',
  templateUrl: './plantillas.component.html',
  standalone: false,
})
export class PlantillasComponent{
  public titulo: string
  public administrador: boolean
  constructor(){
    this.titulo = 'Hola plantilla'
    this.administrador = true
  }
  cambiar(){
    this.administrador = !this.administrador
  }
}
