import { Component } from "@angular/core";
@Component({
  selector: 'fruta',
  templateUrl: './fruta.component.html',
  standalone: false,
  styleUrl: './fruta.component.css'
})

export class FrutaComponent{
  public nombre_componente = 'Componente de fruta'
  public listado_frutas = 'Manzana,Naranja y Sandia'
}

