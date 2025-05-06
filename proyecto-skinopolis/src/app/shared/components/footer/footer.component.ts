import { Component } from '@angular/core';
import { RssIconsComponent } from '../rss-icons/rss-icons.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RssIconsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
