import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { createTimeline } from 'animejs';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ButtonComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild('hero')
  hero!: ElementRef;
  @ViewChild('karambit')
  karambit!: ElementRef;
  @ViewChild('inventoryBotton')
  inventoryBotton!: ElementRef;

  ngAfterViewInit(): void {
    this.heroAnimations();
  }

  heroAnimations(): void {
    if (this.hero && this.karambit && this.inventoryBotton) {
      const timeline = createTimeline({
        loop: false,
      });

      timeline.add(this.hero.nativeElement, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1500,
        easing: 'easeOutQuint',
        delay: 200,
      });
      timeline.add(
        this.karambit.nativeElement,
        {
          translateY: [20, 0],
          duration: 2000,
          easing: 'easeOutQuint',
          delay: 200,
        },
        0
      );
      timeline.add(
        this.karambit.nativeElement,
        {
          opacity: [1, 0.6],
          duration: 3000,
          easing: 'linear',
          alternate: true,
          loop: true,
        },
        0
      );
    }
  }
}
