import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, Validators } from '@angular/forms';

@Directive({
  selector: '[appEqualTo]',
  
  standalone:true,
  providers: [{ provide: NG_VALIDATORS, useExisting: EqualToDirective, multi: true }]
})
export class EqualToDirective implements Validator {
  @Input('appEqualTo') controlName=''; 

  validate(control: AbstractControl): Validators | null {
    const otherControl = control.root.get(this.controlName);
    if (otherControl) {
      if (control.value !== otherControl.value) {
        return { equalTo: true }; 
      }
    }
    return null;
  }
}
