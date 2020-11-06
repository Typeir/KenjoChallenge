import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[app-min][(ngModel)]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MinDirective, multi: true },
  ],
})
export class MinDirective implements Validator {
  @Input()
  min: number;

  validate(c: FormControl): { [key: string]: any } {
    const v = c.value;
    return v < this.min ? { min: true } : null;
  }
}
