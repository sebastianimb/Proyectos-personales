import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { provideIcons } from '@ng-icons/core';
import * as BootstrapIcons from '@ng-icons/bootstrap-icons';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { BurgerDisplayComponent } from './shared/components/burger-display/burger-display.component';

const allBootstrapIcons = {
  biInstagram: BootstrapIcons.bootstrapInstagram,
  biSteam: BootstrapIcons.bootstrapSteam,
  biSearch: BootstrapIcons.bootstrapSearch,
  biCart: BootstrapIcons.bootstrapCart2,
};

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    BurgerDisplayComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  viewProviders: [provideIcons(allBootstrapIcons)],
})
export class AppComponent {
  title = 'Skinopolis';
  burgerActive: boolean = false;
  openCloseBurger() {
    this.burgerActive = !this.burgerActive;
  }
}
