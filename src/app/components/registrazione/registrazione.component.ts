import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  checkIfPswEqualConfirmPsw,
  TrattamentoDatiMustBeTrue,
} from '../../utility/CustomValidators/customValidators';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IRegistrationReq } from '../../utility/modelRequests/modelReq';
import { ToastService } from '../../services/toast.service';
import {
  MessageResp,
  ValidationRespError,
} from '../../utility/modelResponse/modelResp';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registrazione',
  standalone: false,
  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.scss',
})
export class RegistrazioneComponent implements OnDestroy {
  private subscriptions: Subscription | undefined;

  public form = new FormGroup(
    {
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      cognome: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@(gmail|aruba|libero|yahoo|outlook|hotmail|virgilio).(com|it)$'
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*.()\\-+])[A-Za-z\\d!@#$.%^&*()\\-+]{5,20}$'
        ),
      ]),
      conferma_password: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\+39 \\d{3} \\d{7}$'),
      ]),
      trattamento_dati: new FormControl(false, [Validators.required]),
    },
    { validators: [checkIfPswEqualConfirmPsw, TrattamentoDatiMustBeTrue] }
  );

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  public goToLogin() {
    this.router.navigateByUrl('login');
  }

  public onSubmit() {
    console.log(this.form.value);

    if (this.isFormValid()) {
      const dataRegistration: IRegistrationReq = {
        cognome: this.form.controls.cognome.value,
        consensoTrattamentoDati: this.form.controls.trattamento_dati.value,
        email: this.form.controls.email.value,
        nome: this.form.controls.nome.value,
        password: this.form.controls.password.value,
        telefono: this.form.controls.telefono.value,
      };

      this.subscriptions = this.userService
        .registerUser(dataRegistration)
        .subscribe({
          next: (resp: any) => {
            const response = resp as MessageResp;

            const cleanResp = response.message
              .replaceAll('_', ' ')
              .toLocaleUpperCase();
            console.log(response.message);

            this.form.reset();

            this.toastService.show(
              'success',
              cleanResp,
              'registrazione utente',
              'toastRegistration'
            );

            setTimeout(() => {
              this.router.navigateByUrl('login');
            }, 3000);
          },
          error: (err: HttpErrorResponse) => {
            const errMsg = err.error as ValidationRespError;

            for (const key in errMsg) {
              if (errMsg.hasOwnProperty(key)) {
                const errorMessage = errMsg[key];

                this.toastService.show(
                  'error',
                  errorMessage,
                  key.toString(),
                  'toastRegistration'
                );
              }
            }
          },
        });
      //
    } else {
      //
      this.toastService.show(
        'error',
        'FORM INVALIDO',
        'form non valido',
        'toastRegistration'
      );
    }
  }

  public isFormValid() {
    return this.form.valid;
  }
}
