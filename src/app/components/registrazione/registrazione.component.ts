import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  checkIfPswEqualConfirmPsw,
  TrattamentoDatiMustBeTrue,
} from '../../utility/CustomValidators/customValidators';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IRegistrationReq } from '../../utility/modelRequests/modelReq';

@Component({
  selector: 'app-registrazione',
  standalone: false,
  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.scss',
})
export class RegistrazioneComponent {
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

  constructor(private router: Router, private userService: UserService) {}

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

      this.userService.registerUser(dataRegistration).subscribe({
        next: (response) => {
          console.log(response);
          this.form.reset();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error);
        },
      });
    }
  }

  public isFormValid() {
    return this.form.valid;
  }
}
