import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CvService } from '../../services/cv.service';
import { Icv, IRespListaCv } from '../../utility/modelResponse/modelResp';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ricerca-cv-competenza',
  standalone: false,
  templateUrl: './ricerca-cv-competenza.component.html',
  styleUrl: './ricerca-cv-competenza.component.scss',
})
export class RicercaCvCompetenzaComponent {
  public listaCv: Icv[] | undefined;

  public form = new FormGroup({
    competenze: new FormControl('', [Validators.required]),
  });

  constructor(private cvService: CvService) {}

  public onSubmit() {
    if (this.isFormValid()) {
      this.ricerca_per_competenze();
    }
  }

  public isFormValid() {
    return this.form.valid;
  }

  public ricerca_per_competenze() {
    this.cvService
      .ricerca_cv_competenze(this.form.controls.competenze.value)
      .subscribe({
        next: (res: IRespListaCv) => {
          console.log(res);
          this.listaCv = res.listaCV;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }
}
