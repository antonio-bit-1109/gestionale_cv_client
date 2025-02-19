import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ITokenResp,
  ValidationRespError,
} from '../../utility/modelResponse/modelResp';
import { AuthService } from '../../services/auth.service';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements AfterViewInit {
  public form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService,
    private authService: AuthService,
    private subjectService: SubjectService
  ) {}

  // se accedo alla pagina di login tramite redirect effettuato dalla guardia ,
  //  notifico l'utente che ce stato un problema ,
  //  forse non loggato ?'
  // per poter mostrare correttamente il toast devo aspettare che l html sia stato prima caricato, quindi uso il ciclo di vita after viewinit
  ngAfterViewInit(): void {
    console.log(this.subjectService.getMessage());

    if (this.subjectService.getMessage() !== null) {
      const messaggio = this.subjectService.getMessage();

      this.toastService.show(
        'info',
        messaggio ? messaggio : 'default',
        'informazione',
        'toastLogin'
      );

      // pulisco il messaggio per resettare la procedura
      this.subjectService.clearMessage();
    }
  }

  public goToRegistrazione() {
    this.router.navigateByUrl('registrazione');
  }

  public onSubmit() {
    console.log(this.form.value);

    if (
      this.isFormValid() &&
      this.form.controls.email.value &&
      this.form.controls.password.value
    ) {
      this.userService
        .DoLogin(
          this.form.controls.email.value,
          this.form.controls.password.value
        )
        .subscribe({
          next: (tokenResp: any) => {
            const tokenValue = tokenResp.token;

            // se la login va a buon fine salvo il token in local storage
            // e notifico l'utente

            const result = this.authService.saveInStorage(tokenValue);

            if (result) {
              this.toastService.show(
                'success',
                'Login effettuata con successo',
                'LOGIN',
                'toastLogin'
              );
            }

            setTimeout(() => {
              this.router.navigateByUrl('/home');
            }, 2500);

            // console.log(tokenResp);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.error);

            // imposto l'errore attraverso un interfaccia che ha dinamiche chiavi e dinamici valori
            // ciclo ogni coppia chiave - valore nella risposta e li mostro in un messaggio toast
            // impongo alcune restizioni,
            // come il fatto che se c'è una chiave ma il suo valore è null allora salto l'iterazione corrente e passo al prossimo

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
                  'toastLogin',
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
