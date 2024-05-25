import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDate',
  standalone: true
})
export class ShortDatePipe implements PipeTransform {

  shortDate!:string;
  datePipe!:DatePipe;

  transform(value: Date): string {
    
    this.shortDate=value.toString().substring(0,10);
    return this.shortDate;
  }

}
