import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CvService } from '../../services/cv.service';
import { Icv, IRespListaCV } from '../../utility/modelResponse/modelResp';
import { filter, map, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ricerca-cv-nome-candidato',
  standalone: false,
  templateUrl: './ricerca-cv-nome-candidato.component.html',
  styleUrl: './ricerca-cv-nome-candidato.component.scss',
})
export class RicercaCvNomeCandidatoComponent {
  public listaCv: Icv[] | undefined;

  public form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
  });

  constructor(private cvService: CvService) {}

  public onSubmit() {
    if (this.isFormValid()) {
      this.ricercaCv_nome_candidato();
    } else {
      console.log('form non valido.');
    }
  }

  public isFormValid() {
    return this.form.valid;
  }

  public ricercaCv_nome_candidato() {
    this.cvService
      .ricerca_cv_nome_candidato(this.form.controls.nome.value)
      .pipe(
        take(1)
        // map( (resp : IRespListaCV) => resp.listaCV.filter(cv => cv.))
      )
      .subscribe({
        next: (res: IRespListaCV) => {
          this.listaCv = res.listaCV;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }
}
