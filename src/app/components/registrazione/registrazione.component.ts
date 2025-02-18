import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Password } from 'primeng/password';
import { checkIfPswEqualConfirmPsw } from '../../CustomValidators/customValidators';

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
    { validators: checkIfPswEqualConfirmPsw }
  );

  constructor(private router: Router) {}

  public goToLogin() {
    this.router.navigateByUrl('login');
  }

  public onSubmit() {
    console.log(this.form.value);
  }

  public isFormValid() {
    return this.form.valid;
  }
}
