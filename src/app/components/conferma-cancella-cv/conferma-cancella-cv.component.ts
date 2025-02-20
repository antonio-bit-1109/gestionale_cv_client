import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-conferma-cancella-cv',
  standalone: false,
  templateUrl: './conferma-cancella-cv.component.html',
  styleUrl: './conferma-cancella-cv.component.scss',
})
export class ConfermaCancellaCvComponent {
  @Output() nascondi = new EventEmitter();

  public nascondiModale() {
    this.nascondi.emit(false);
  }
}
