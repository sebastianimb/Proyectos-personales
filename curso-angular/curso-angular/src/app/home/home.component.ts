import { Component } from "@angular/core";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  standalone:false,
})

export class HomeComponent {
  public titulo: string = 'Home Component'
}
