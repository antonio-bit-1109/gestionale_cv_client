import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modifica-img-profilo',
  standalone: false,
  templateUrl: './modifica-img-profilo.component.html',
  styleUrl: './modifica-img-profilo.component.scss',
})
export class ModificaImgProfiloComponent {
  @Output() closeModal = new EventEmitter();

  public emitClose() {
    this.closeModal.emit(false);
  }
}
