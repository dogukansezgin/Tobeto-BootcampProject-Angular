import { Component } from '@angular/core';
import { AppliedBootcampsListComponent } from '../../features/components/bootcamps/applied-bootcamps-list/applied-bootcamps-list.component';

@Component({
  selector: 'app-applied-bootcamps-page',
  standalone: true,
  imports: [AppliedBootcampsListComponent],
  templateUrl: './applied-bootcamps-page.component.html',
  styleUrl: './applied-bootcamps-page.component.scss'
})
export class AppliedBootcampsPageComponent {

}
