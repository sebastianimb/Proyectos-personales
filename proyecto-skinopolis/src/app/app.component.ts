import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { provideIcons } from '@ng-icons/core';
import * as BootstrapIcons from '@ng-icons/bootstrap-icons';

const allBootstrapIcons = {
  biInstagram: BootstrapIcons.bootstrapInstagram,
};

@Component({
  selector: 'app-root',
  imports: [RouterModule, NavBarComponent, HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  viewProviders: [provideIcons(allBootstrapIcons)]
})
export class AppComponent {
  title = 'Skinopolis';
}
