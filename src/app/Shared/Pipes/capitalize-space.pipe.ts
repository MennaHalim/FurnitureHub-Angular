import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeSpace',
  standalone: true
})
export class CapitalizeSpacePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value.replace(/([A-Z])/g, ' $1').trim();
  }
}
