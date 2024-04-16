import { Component } from '@angular/core';
import { ApplicantAppliedBootcampListGroupComponent } from '../../features/components/users/applicants/applicant-applied-bootcamp-list-group/applicant-applied-bootcamp-list-group.component';

@Component({
  selector: 'app-applicant-applied-bootcamps-page',
  standalone: true,
  imports: [ApplicantAppliedBootcampListGroupComponent],
  templateUrl: './applicant-applied-bootcamps-page.component.html',
  styleUrl: './applicant-applied-bootcamps-page.component.scss'
})
export class ApplicantAppliedBootcampsPageComponent {

}
