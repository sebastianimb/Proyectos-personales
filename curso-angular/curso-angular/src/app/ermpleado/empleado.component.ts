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
  public empleado: Empleado;
  public trabajadores: Array<Empleado> = []
  public color:string = 'lightblue'
  public color_seleccionado ='#ccc'
  constructor(){
    this.empleado = new Empleado('Sebastian Molina', 28, 'Desarrollador Web', false)
  }
  ngOnInit(){
    this.agregarTrabajador(new Empleado('Felipe Molina', 30, 'QA', false))
  }
  agregarSebastian(){
    this.trabajadores.push(this.empleado)
  }
  agregarTrabajador(trabajador:Empleado){
    this.trabajadores.push(trabajador)
  }
  get getTrabajadores(){
    return this.trabajadores
  }
}
