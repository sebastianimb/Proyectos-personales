import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  standalone:true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() routerLink: string = '/';
  @Input() classButton:string = ''
  @Input() goTo:string = ''

  goToUrl(){
    if (this.goTo !== '') {
      window.open(`http://${this.goTo}`, '_blank')
      return
    }
  }
}
