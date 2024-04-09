import { Component } from '@angular/core';
import { ApplicantUpdateFormComponent } from '../../features/components/users/applicant-update-form/applicant-update-form.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ApplicantUpdateFormComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

}
