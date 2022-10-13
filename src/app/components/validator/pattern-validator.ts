import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export class PatternValidator {

  public static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }
}
