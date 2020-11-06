import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[app-max][(ngModel)]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MaxDirective, multi: true },
  ],
})
export class MaxDirective implements Validator {
  @Input()
  max: number;

  validate(c: FormControl): { [key: string]: any } {
    const v = c.value;
    return v > this.max ? { max: true } : null;
  }
}
