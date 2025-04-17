import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hijo',
  standalone: false,
  templateUrl: './hijo.component.html',
  styleUrl: './hijo.component.css'
})
export class HijoComponent {
  titulo= 'Soy componente hijo'
  @Input() propiedadUno: string = ''
  @Input('texto') propiedadDos: string = ''
  @Output() printTitle = new EventEmitter<string>()
  printTitleOutput(){
    this.printTitle.emit(this.titulo)
  }
}
