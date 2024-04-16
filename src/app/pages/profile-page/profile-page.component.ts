import { Component } from '@angular/core';
import { ApplicantInfoUpdateFormComponent } from '../../features/components/users/applicants/applicant-info-update-form/applicant-info-update-form.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ApplicantInfoUpdateFormComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

}
