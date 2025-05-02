import { Component, Input } from '@angular/core';
import { RssIconsComponent } from '../rss-icons/rss-icons.component'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterLink, RssIconsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
}
