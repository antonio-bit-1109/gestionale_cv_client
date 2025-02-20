import { Component, OnInit } from '@angular/core';
import { CvService } from '../../services/cv.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ricerca-cv-esperienze',
  standalone: false,
  templateUrl: './ricerca-cv-esperienze.component.html',
  styleUrl: './ricerca-cv-esperienze.component.scss',
})
export class RicercaCvEsperienzeComponent {
  public form = new FormGroup({
    esperienze: new FormControl('', [Validators.required]),
  });

  constructor(private cvService: CvService) {}

  public onSubmit() {
    if (this.isFormValid()) {
      this.cvService
        .ricerca_Cv_esperienze(this.form.controls.esperienze.value)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  public isFormValid() {
    return this.form.valid;
  }
}
