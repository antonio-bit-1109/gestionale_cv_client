import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CvService } from '../../services/cv.service';
import { AuthService } from '../../services/auth.service';
import { IEdit_Create_Cv } from '../../utility/modelRequests/modelReq';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationRespError } from '../../utility/modelResponse/modelResp';

@Component({
  selector: 'app-crea-cv',
  standalone: false,
  templateUrl: './crea-cv.component.html',
  styleUrl: './crea-cv.component.scss',
})
export class CreaCvComponent implements OnInit {
  public lingueSelezionate: string[] = [];
  public form = new FormGroup({
    titolo: new FormControl('', [Validators.required]),
    competenze: new FormControl('', [Validators.required]),
    istruzione: new FormControl('', [Validators.required]),
    esperienzePrecedenti: new FormControl('', [Validators.required]),
    lingueConosciute: new FormControl('', []),
    descrizioneGenerale: new FormControl('', [Validators.required]),
  });

  public id_utente: string | undefined;

  constructor(
    private cvService: CvService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    if (this.authService.isUserLoggedIn()) {
      this.id_utente = this.authService.getIdUser();
    }
  }

  ngOnInit(): void {}

  public onLinguaChange(event) {
    const options = event.target.options;
    // this.lingueSelezionate = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        if (!this.lingueSelezionate.includes(options[i].value)) {
          this.lingueSelezionate.push(options[i].value);
        }
      }
    }
    console.log('lingue selezionate', this.lingueSelezionate);
  }

  public deleteLanguage(lingua: string) {
    this.lingueSelezionate = this.lingueSelezionate.filter(
      (l) => l.toLowerCase().trim() !== lingua.toLowerCase().trim()
    );
  }

  public stringifyArrayLingue(): string {
    let outputString = '';

    for (let i = 0; i < this.lingueSelezionate.length; i++) {
      let lingua = this.lingueSelezionate[i];

      if (i === this.lingueSelezionate.length - 1) {
        outputString += ` ${lingua}`;
      } else {
        outputString += `${lingua}, `;
      }
    }
    return outputString;
  }

  public onSubmit() {
    console.log(this.form.value);

    if (this.isFormValid()) {
      if (this.lingueSelezionate.length === 0) {
        //
        this.toastService.show(
          'error',
          'inserisci lungue conosciute',
          'dati mancanti',
          'toastCreaCv'
        );
        return;
      }

      this.form.controls.lingueConosciute.patchValue(
        this.stringifyArrayLingue()
      );

      const dataCreazCv: IEdit_Create_Cv = {
        competenze: this.form.controls.competenze.value,
        descrizioneGenerale: this.form.controls.descrizioneGenerale.value,
        esperienzePrecedenti: this.form.controls.esperienzePrecedenti.value,
        idUtente: parseInt(this.id_utente),
        istruzione: this.form.controls.istruzione.value,
        lingueConosciute: this.form.controls.lingueConosciute.value,
        titolo: this.form.controls.titolo.value,
      };

      console.log(dataCreazCv, 'dati cv');
      this.cvService.createCv(dataCreazCv).subscribe({
        next: (resp: { message: string }) => {
          console.log(resp);
          this.toastService.show(
            'success',
            resp.message,
            'creazione cv',
            'toastCreaCv'
          );

          setTimeout(() => {
            this.router.navigateByUrl('/home');
          }, 2000);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);

          const errMsg = err.error as ValidationRespError;
          for (const key in errMsg) {
            if (errMsg.hasOwnProperty(key)) {
              const errorMessage = errMsg[key];

              if (!errorMessage) {
                continue;
              }

              this.toastService.show(
                'error',
                errorMessage,
                key.toString(),
                'toastCreaCv',
                3500
              );
            }
          }
        },
      });
    }
  }

  public isFormValid() {
    return this.form.valid;
  }
}
