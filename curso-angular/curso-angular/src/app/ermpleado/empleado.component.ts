import { Component } from "@angular/core";

@Component({
  selector:'empleado',
  templateUrl:'./empleado.component.html',
  standalone:false,
  styleUrl: './empleado.component.css'
})

export class EmpleadoComponent {
  public titulo = 'Titulo del componente empleado'
}
