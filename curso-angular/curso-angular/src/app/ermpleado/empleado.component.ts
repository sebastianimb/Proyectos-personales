import { Component } from "@angular/core";
import { Empleado } from "./empleado";
import { log } from "console";
@Component({
  selector:'empleado',
  templateUrl:'./empleado.component.html',
  standalone:false,
  styleUrl: './empleado.component.css'
})

export class EmpleadoComponent {
  public titulo = 'Titulo del componente empleado'
  public empleado!: Empleado;
  public trabajadores: Array<Empleado> = []
  ngOnInit(){
    this.empleado = new Empleado('Sebastian Molina', 28, 'Desarrollador Web', false)
  }
  agregarTrabajador(){
    this.trabajadores.push(this.empleado)
  }
  get getTrabajadores(){
    return this.trabajadores
  }
}
