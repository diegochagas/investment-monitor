import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positiveNumber'
})
export class PositiveNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value < 0) {
      return value * -1;
    }

    return value;
  }
}
