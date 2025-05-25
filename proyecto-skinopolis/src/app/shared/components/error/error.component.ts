import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  titulo = 'Error. No se ha podido encontrar la página.';
}
