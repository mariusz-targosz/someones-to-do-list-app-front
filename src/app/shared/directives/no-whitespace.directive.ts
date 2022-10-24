import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { noWhitespaceValidator } from '../validators/no-whitespace.validator';

@Directive({
  selector: '[noWhitespace]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoWhitespaceDirective, multi: true }]
})
export class NoWhitespaceDirective {

  validate(control: AbstractControl): ValidationErrors | null {
    return noWhitespaceValidator()(control);
  }
}
