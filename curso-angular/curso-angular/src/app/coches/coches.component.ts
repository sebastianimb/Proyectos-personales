import { Component } from "@angular/core";
import { Coche } from './coche'
import { log } from "console";

@Component({
  selector: 'coches',
  templateUrl: './coches.component.html',
  standalone: false
})
export class CochesComponent{
  public coche: Coche
  public coches: Array<Coche>
  constructor(){
    this.coche = new Coche('','','')
    this.coches = [new Coche('Nissan v16','2100','Negro')]
  }
  onSumbit(){
    this.coches.push(this.coche)
    this.coche = new Coche('','','')
  }
}
