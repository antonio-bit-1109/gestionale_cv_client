import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CvService } from '../../services/cv.service';
import { Icv } from '../../utility/modelResponse/modelResp';

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
      // this.ricercaCv_per_esperienze();
    }
  }

  public isFormValid() {
    return this.form.valid;
  }

  // public ricercaCv_per_esperienze() {
  //   this.cvService
  //     .ricerca_Cv_esperienze(this.form.controls.esperienze.value)
  //     .subscribe({
  //       next: (res: IRespListaCV) => {
  //         console.log(res);
  //         this.listaCv = res.listaCV;
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         console.log(err);
  //       },
  //     });
  // }
}
