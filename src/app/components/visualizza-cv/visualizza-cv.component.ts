import { Component, Input } from '@angular/core';
import { Icv, IRespSingoloCv } from '../../utility/modelResponse/modelResp';
import { ActivatedRoute } from '@angular/router';
import { CvService } from '../../services/cv.service';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-visualizza-cv',
  standalone: false,
  templateUrl: './visualizza-cv.component.html',
  styleUrl: './visualizza-cv.component.scss',
})
export class VisualizzaCvComponent {
  @Input() cv: Icv | undefined;
  public id_cv: string | undefined;
  // public id_utente: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cvService: CvService,
    private authService: AuthService
  ) {
    this.id_cv = this.activatedRoute.snapshot.paramMap.get('id_cv');
    // this.id_utente = this.authService.getIdUser();

    if (this.id_cv) {
      this.getSingoloCV();
    }
  }

  public getSingoloCV() {
    this.cvService.getDaticv(this.id_cv).subscribe({
      next: (resp: IRespSingoloCv) => {
        this.cv = resp.cv;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error);
      },
    });
  }

  public prendiNome(proprietario: string) {
    const spazio = proprietario?.indexOf(' ');
    const nome = proprietario?.slice(0, spazio);
    return nome;
  }

  public prendiCognome(proprietario: string) {
    const spazio = proprietario?.indexOf(' ');
    const cognome = proprietario?.slice(spazio + 1);
    return cognome;
  }
}
