import { Component } from "@angular/core";
import { Coche } from './coche'
import { PeticionesService } from "../services/peticiones.service";
interface postResponse {
  userId: number,
  id: number,
  title: string,
  body: string
}
@Component({
  selector: 'coches',
  templateUrl: './coches.component.html',
  standalone: false,
  providers: [PeticionesService]
})
export class CochesComponent{
  public coche: Coche
  public coches: Array<Coche>
  public posts: Array<postResponse> = []
  constructor(
    private _peticionesService: PeticionesService,
  ){
    this.coche = new Coche('','','')
    this.coches = [new Coche('Nissan v16','2100','Negro')]
  }
  ngOnInit(){
    this._peticionesService.getPost().subscribe({
      next: (result: postResponse[]) => {
        this.posts = result
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        console.log('Petición completada');
      }
    })
  }
  onSumbit(){
    this.coches.push(this.coche)
    this.coche = new Coche('','','')
  }
}
