import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-generic',
  standalone: false,
  templateUrl: './modal-generic.component.html',
  styleUrl: './modal-generic.component.scss',
})
export class ModalGenericComponent {
  @Input() visible: boolean = false;
}
