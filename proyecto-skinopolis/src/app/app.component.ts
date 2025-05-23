import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  RouterModule,
} from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { provideIcons } from '@ng-icons/core';
import * as BootstrapIcons from '@ng-icons/bootstrap-icons';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { BurgerDisplayComponent } from './shared/components/burger-display/burger-display.component';
import { filter, Subscription } from 'rxjs';
import { animate } from 'animejs';

const allBootstrapIcons = {
  biInstagram: BootstrapIcons.bootstrapInstagram,
  biSteam: BootstrapIcons.bootstrapSteam,
  biSearch: BootstrapIcons.bootstrapSearch,
  biCart: BootstrapIcons.bootstrapCart2,
  biChevron: BootstrapIcons.bootstrapChevronDown,
  biTrash: BootstrapIcons.bootstrapTrash3Fill,
  biFunnel: BootstrapIcons.bootstrapFunnel,
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
  @ViewChild('pageTransitionOverlay') pageTransitionOverlay!: ElementRef;
  private routerSubscription: Subscription | undefined;

  private isAnimating = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setupPageTransition();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  private setupPageTransition(): void {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationError
        )
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (this.isAnimating) return;
          this.isAnimating = true;
          this.pageTransitionOverlay.nativeElement.style.pointerEvents = 'auto';
          animate(this.pageTransitionOverlay.nativeElement, {
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutQuint',
          });
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationError
        ) {
          if (!this.isAnimating) return;
          animate(this.pageTransitionOverlay.nativeElement, {
            opacity: [1, 0],
            duration: 500,
            easing: 'easeInQuint',
          });

          this.pageTransitionOverlay.nativeElement.style.pointerEvents = 'none';
          this.isAnimating = false;
        }
      });
  }

  title = 'Skinopolis';
  burgerActive: boolean = false;
  openCloseBurger() {
    this.burgerActive = !this.burgerActive;
  }
}
