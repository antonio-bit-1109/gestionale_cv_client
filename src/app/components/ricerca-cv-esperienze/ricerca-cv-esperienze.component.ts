import { Component, OnInit } from '@angular/core';
import { CvService } from '../../services/cv.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Icv, IRespListaCV } from '../../utility/modelResponse/modelResp';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ricerca-cv-esperienze',
  standalone: false,
  templateUrl: './ricerca-cv-esperienze.component.html',
  styleUrl: './ricerca-cv-esperienze.component.scss',
})
export class RicercaCvEsperienzeComponent {
  public listaCv: Icv[] | undefined;

  public form = new FormGroup({
    esperienze: new FormControl('', [Validators.required]),
  });

  constructor(private cvService: CvService) {}

  public onSubmit() {
    if (this.isFormValid()) {
      this.ricercaCv_per_esperienze();
    }
  }

  public isFormValid() {
    return this.form.valid;
  }

  public ricercaCv_per_esperienze() {
    this.cvService
      .ricerca_Cv_esperienze(this.form.controls.esperienze.value)
      .subscribe({
        next: (res: IRespListaCV) => {
          console.log(res);
          this.listaCv = res.listaCV;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }
}
