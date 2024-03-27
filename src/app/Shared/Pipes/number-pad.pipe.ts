import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberPad',
  standalone: true
})
export class NumberPadPipe implements PipeTransform {

  transform(value: number): string {
    return value.toString().padStart(2, '0');
  }

}
