import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return null;
    }
    const m = moment(value);
    return m.isValid() ? m.format('DD MMM YYYY, hh:mmA') : null; // 01 Mar 2019, 10:48AM
  }

}
