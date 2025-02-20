import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CvService } from '../../services/cv.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-conferma-cancella-cv',
  standalone: false,
  templateUrl: './conferma-cancella-cv.component.html',
  styleUrl: './conferma-cancella-cv.component.scss',
})
export class ConfermaCancellaCvComponent {
  @Input() dataCreazioneCv: string | undefined;
  @Input() titoloCv: string | undefined;

  @Input() id_cv: number | undefined;

  @Input() id_utente: string | undefined;
  @Output() nascondi = new EventEmitter();
  @Output() notificaCancellazione = new EventEmitter();

  constructor(private cvService: CvService, private authService: AuthService) {
    if (this.authService.isUserLoggedIn()) {
      this.id_utente = this.authService.getIdUser();
    } else {
      console.error(
        "impossibile recuperare id utente per la cancellazione del cv. L'utente non risulta loggato?"
      );
    }
  }

  public nascondiModale() {
    this.nascondi.emit(false);
  }

  public cancellaCv() {
    this.nascondiModale();
    this.cvService.deleteCv(this.id_utente, this.id_cv).subscribe({
      next: (resp) => {
        //
        console.log(resp);
        this.notificaCancellazione.emit(true);
        //
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
