import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RssIconsComponent } from '../rss-icons/rss-icons.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-burger-display',
  imports: [CommonModule, RssIconsComponent, RouterLink, RouterLinkActive],
  templateUrl: './burger-display.component.html',
  styleUrl: './burger-display.component.css',
})
export class BurgerDisplayComponent {
  @Input() public burgerActive: boolean = false;
  @Output() burgerToggle = new EventEmitter<void>();
  closeBurger() {
    this.burgerToggle.emit();
  }
}
