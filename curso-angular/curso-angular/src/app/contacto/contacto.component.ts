import { Component } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: 'contacto',
  templateUrl: './contacto.component.html',
  standalone:false,
})

export class ContactComponent {
  public titulo: string = 'Contact Component'
  public params: string | undefined
  constructor(
    private _route : ActivatedRoute,
    private _router : Router
  ){}
  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.params = params['page'];
    });
  }
  redirect(){
    this._router.navigate(['/contacto', 'sebastianimb'])
  }
}
