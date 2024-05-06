import { Component } from '@angular/core';
import { BootcampAllComponent } from '../../features/components/bootcamps/bootcamp-all/bootcamp-all.component';

@Component({
  selector: 'app-bootcamp-all-page',
  standalone: true,
  imports: [BootcampAllComponent],
  templateUrl: './bootcamp-all-page.component.html',
  styleUrl: './bootcamp-all-page.component.scss'
})
export class BootcampAllPageComponent {

}
