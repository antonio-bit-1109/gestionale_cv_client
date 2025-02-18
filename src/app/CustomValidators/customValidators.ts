import { AbstractControl, ValidatorFn } from '@angular/forms';

export const checkIfPswEqualConfirmPsw: ValidatorFn = (
  control: AbstractControl
): { [key: string]: boolean } | null => {
  const password = control.get('password');
  const conferma_password = control.get('conferma_password');

  if (
    password &&
    conferma_password &&
    password.value !== conferma_password.value
  ) {
    return { mismatch: true };
  }

  return null;
};
