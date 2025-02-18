import { AbstractControl, ValidatorFn } from '@angular/forms';

//validatori custom per i form , se non ho validatori prefabbricati da usare
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

export const TrattamentoDatiMustBeTrue: ValidatorFn = (
  control: AbstractControl
): { [key: string]: boolean } | null => {
  const trattamentoDati = control.get('trattamento_dati');

  if (!trattamentoDati) {
    return { trattamentoFalse: true };
  }

  return null;
};
