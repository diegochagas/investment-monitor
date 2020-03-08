import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: any, rpl?: any[], sufix?: any): any {
    let val = value;

    rpl.forEach((item) => {
      val = val.replace(item, '');
    });

    if (sufix) {
      return val + sufix;
    }

    return val;
  }

}
