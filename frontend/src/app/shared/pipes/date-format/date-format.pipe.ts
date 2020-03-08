import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, args: any = "DD/MM/YYYY HH:mm:ss A"): any {
    if ((new Date(value)).getTime() > 1400000000000) {
      if (moment(value, moment.ISO_8601, true).isValid()) {
        return moment(value).format(args);
      } else if (moment(new Date(value).toISOString(), moment.ISO_8601, true).isValid()) {
        return moment(value).format(args);
      } else {
        return value;
      }
    } else {
      return value;
    }
  }

}
