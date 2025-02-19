import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CvService } from '../../services/cv.service';
import { Icv, IRespSingoloCv } from '../../utility/modelResponse/modelResp';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modifica-cv',
  standalone: false,
  templateUrl: './modifica-cv.component.html',
  styleUrl: './modifica-cv.component.scss',
})
export class ModificaCvComponent implements OnInit {
  public id_cv: string | undefined;
  public id_utente: string | undefined;
  public cv: Icv | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private cvService: CvService
  ) {}

  public form = new FormGroup({
    titolo: new FormControl('', [Validators.required]),
    competenze: new FormControl('', [Validators.required]),
    istruzione: new FormControl('', [Validators.required]),
    esperienzePrecedenti: new FormControl('', [Validators.required]),
    lingueConosciute: new FormControl('', [Validators.required]),
    descrizioneGenerale: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.id_cv = this.activatedRoute.snapshot.paramMap.get('id_cv');
    console.log(this.id_cv);

    if (this.authService.isUserLoggedIn() !== null) {
      this.id_utente = this.authService.getIdUser();
      this.getDataCvSelezionato();
    }
  }

  public getDataCvSelezionato() {
    this.cvService.getDaticv(this.id_cv, this.id_utente).subscribe({
      next: (res: IRespSingoloCv) => {
        this.cv = res.cv;
        this.fillFormDefaultVal();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error);
      },
    });
  }

  public fillFormDefaultVal() {
    this.form.patchValue({
      titolo: this.cv.titolo,
      competenze: this.cv.competenze,
      istruzione: this.cv.istruzione,
      esperienzePrecedenti: this.cv.esperienze_Precedenti,
      lingueConosciute: this.cv.lingueConosciute,
      descrizioneGenerale: this.cv.descrizioneGenerale,
    });
  }

  public isFormValid() {
    return this.form.valid;
  }

  public onSubmit() {}
}
