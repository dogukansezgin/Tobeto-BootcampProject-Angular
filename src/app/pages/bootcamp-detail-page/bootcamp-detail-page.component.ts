import { Component } from '@angular/core';
import { BootcampDetailComponent } from '../../features/components/bootcamps/bootcamp-detail/bootcamp-detail.component';

@Component({
  selector: 'app-bootcamp-detail-page',
  standalone: true,
  imports: [BootcampDetailComponent],
  templateUrl: './bootcamp-detail-page.component.html',
  styleUrl: './bootcamp-detail-page.component.scss'
})
export class BootcampDetailPageComponent {

}
