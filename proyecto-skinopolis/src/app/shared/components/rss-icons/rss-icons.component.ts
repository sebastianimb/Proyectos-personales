import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-rss-icons',
  standalone: true,
  imports: [ButtonComponent,NgIcon],
  templateUrl: './rss-icons.component.html',
  styleUrl: './rss-icons.component.css'
})
export class RssIconsComponent {

}
