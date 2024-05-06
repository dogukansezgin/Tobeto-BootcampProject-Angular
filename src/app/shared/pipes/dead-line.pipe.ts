import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deadLine',
  standalone: true
})
export class DeadLinePipe implements PipeTransform {

  deadline!:Date;

  transform(value: string, day: number): string {
    this.deadline=new Date(value);
    this.deadline.setDate(this.deadline.getDate()-day);
    return this.deadline.toLocaleDateString();
  }

}
