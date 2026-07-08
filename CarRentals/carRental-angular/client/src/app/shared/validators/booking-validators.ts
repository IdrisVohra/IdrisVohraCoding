import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = Number(control.value);
    if (control.value === null || control.value === '') {
      return null;
    }
    return value >= minAge ? null : { minAge: { requiredAge: minAge, actual: value } };
  };
}

export function futureOrTodayDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = new Date(control.value);
  return selected >= today ? null : { pastDate: true };
}

export function dropAfterPickValidator(pickControlName: string, dropControlName: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const pick = group.get(pickControlName)?.value;
    const drop = group.get(dropControlName)?.value;
    if (!pick || !drop) {
      return null;
    }
    return new Date(drop) >= new Date(pick) ? null : { dropBeforePick: true };
  };
}

export function positiveNumberValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value === null || control.value === '') {
    return null;
  }
  return Number(control.value) > 0 ? null : { positiveNumber: true };
}
