import { Component } from '@angular/core';
import { BootcampListUnfinishedComponent } from '../../features/components/bootcamps/bootcamp-list-unfinished/bootcamp-list-unfinished.component';
import { BootcampListFinishedComponent } from '../../features/components/bootcamps/bootcamp-list-finished/bootcamp-list-finished.component';

@Component({
  selector: 'app-bootcamp-all-page',
  standalone: true,
  imports: [BootcampListUnfinishedComponent, BootcampListFinishedComponent],
  templateUrl: './bootcamp-all-page.component.html',
  styleUrl: './bootcamp-all-page.component.scss'
})
export class BootcampAllPageComponent {

}
