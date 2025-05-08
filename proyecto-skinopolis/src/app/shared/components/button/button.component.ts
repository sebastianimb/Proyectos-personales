import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() routerLink: string = '/';
  @Input() classButton: string = '';
  @Input() goTo: string = '';

  goToUrl() {
    if (this.goTo !== '') {
      if (this.goTo.includes('steam://')) {
        window.open(`${this.goTo}`);
        return;
      }
      if (this.goTo.includes('http://') || this.goTo.includes('https://')) {
        window.open(`${this.goTo}`);
        return;
      }
      window.open(`http://${this.goTo}`, '_blank');
      return;
    }
  }
}
